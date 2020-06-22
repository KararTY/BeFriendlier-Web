import { DateTime } from 'luxon'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import Twitch from '@ioc:Adonis/Addons/Twitch'

import { TwitchUsersBody } from 'src/Twitch' // For type definitions

export default class UsersController {
  public async read ({ auth, view }: HttpContextContract) {
    if (auth.user === undefined) {
      return
    }

    await auth.user.preload('profile')
    await auth.user.preload('favoriteStreamers')

    return view.render('core', {
      user: auth.user.toJSON(),
      web: {
        template: 'user',
        title: `User settings - ${auth.user.displayName}`,
      },
    })
  }

  public async update ({ request, session, auth, response }: HttpContextContract) {
    if (auth.user === undefined) {
      return
    }

    const { favoriteStreamers, toggleGlobalPublic, toggleStreamerMode } = request.post()

    // TODO: OPTIMIZE CALLS BY FILTERING OUT EXISTING FIELDS & ONLY DETACHING NON-EXISTING FIELDS.

    const favoriteStreamersInput: string[] = favoriteStreamers.split(',').filter(Boolean).slice(0, 5)
    const newFavoriteStreamers: User[] = []
    const sessionMessage: string[] = []
    if (favoriteStreamersInput.length > 0) {
      const validStreamerNames: string[] = []
      for (let index = 0; index < favoriteStreamersInput.length; index++) {
        const streamerName = encodeURI(favoriteStreamersInput[index]).normalize()

        // Validate the name.
        if (Boolean(streamerName.match(/[^\w]/)) || streamerName.length >= 32) {
          sessionMessage.push(`Error: ${streamerName} is malformed, please only use characters found in Twitch usernames.`)
          continue // These are for readability.
        } else {
          validStreamerNames.push(streamerName)
        }
      }

      if (sessionMessage.length > 0) {
        session.flash('user', sessionMessage.join('\r\n'))
      }

      const existingUsers = await User.query().whereIn('name', validStreamerNames).limit(5)
      newFavoriteStreamers.push(...existingUsers)

      if (existingUsers.length < validStreamerNames.length) {
        // Time to get the rest of the streamers, if they exist.
        const existingUsernames = existingUsers.map(i => i.name)

        const streamersToFind = validStreamerNames.filter(i => !existingUsernames.includes(i))

        // Call Twitch API.
        const streamersToAppend = await Twitch.getUser(session.get('token'), streamersToFind)

        if (streamersToAppend instanceof Array) {
          const d = await User.createMany(streamersToAppend.map((streamer: TwitchUsersBody) => {
            return {
              twitchID: streamer.id,
              name: streamer.login,
              displayName: streamer.display_name,
              avatar: streamer.profile_image_url,
            }
          }))

          newFavoriteStreamers.push(...d)
        } else {
          const twitchBody = await Twitch.refreshToken(session.get('refresh'))

          if (twitchBody !== null) {
            session.put('token', twitchBody.access_token)
            session.put('refresh', twitchBody.refresh_token)
            session.flash('user', 'Error: Something went wrong with Twitch. Try again. Reference: #USERUPDATE1')
          } else {
            session.flash('user', 'Error: Something went wrong with Twitch. ' +
            'Try again later. Reference: #USERUPDATE2')
          }
          return response.redirect('/user')
        }
      }
    }

    await auth.user.preload('profile')
    const globalProfile = auth.user.profile.find(profile => profile.global)
    // Global profile can't be undefined, this is here because typescript is strict.
    if (globalProfile !== undefined) {
      if (toggleGlobalPublic === 'true') {
        // Set global profile to true.
        globalProfile.enabled = true
      } else {
        // Set global profile to false.
        globalProfile.enabled = false
      }

      await auth.user.related('profile').save(globalProfile)
    }

    if (toggleStreamerMode === 'true') {
      auth.user.streamerMode = true
    } else {
      auth.user.streamerMode = false
    }

    /* This is very inefficient. TODO: FIX */
    // Remove all.
    await auth.user.related('favoriteStreamers').detach()

    // Add new.
    await auth.user.related('favoriteStreamers').saveMany(newFavoriteStreamers)
    /**/

    if (session.flashMessages.get('user') === null) {
      session.flash('user', 'Successfully updated user settings.')
    }

    await auth.user.save()
    return response.redirect('/user')
  }

  public async delete ({ auth, response, session }: HttpContextContract) {
    if (auth.user === undefined) {
      return
    }

    let accountDeleted = false

    const user = await User.find(auth.user.id)

    if (user !== null) {
      await user.preload('profile')
      await user.preload('favoriteStreamers')

      for (let i = 0; i < user.profile.length; i++) {
        const profile = user.profile[i]
        await profile.related('matches').detach()

        await profile.delete()
      }

      await user.related('favoriteStreamers').detach()

      await user.delete()
      await auth.logout()
      accountDeleted = true
    }

    session.flash('splash', accountDeleted
      ? 'Account has been deleted.'
      // eslint-disable-next-line comma-dangle
      : 'Error: Something went wrong, please try again later! Reference: #USERDELETE1'
    )

    return response.redirect('/')
  }

  public async refresh ({ auth, response, session }: HttpContextContract) {
    if (auth.user === undefined) {
      return
    }

    if (auth.user.updatedAt.diffNow('minutes').minutes > -5) {
      session.flash('user', 'Error: Account has recently been changed. ' +
      'Please wait at least 5 minutes before refreshing Twitch data.')
      return response.redirect('/user')
    }

    const twitchBody = await Twitch.getUser(session.get('token'))

    if (twitchBody === null) {
      if (session.get('refreshedToken') !== null) {
        session.flash('user', 'Error: Twitch returned nothing after repeated attempts. ' +
        'Try again later. Reference: #USERREFRESH1')
      } else {
        const twitchBody = await Twitch.refreshToken(session.get('refresh'))
        if (twitchBody !== null) {
          session.put('token', twitchBody.access_token)
          session.put('refresh', twitchBody.refresh_token)
          session.flash('user', 'Error: Try again.')
          session.put('refreshedToken', true)
        } else {
          session.flash('user', 'Error: Twitch not accepting refresh token. Try again later. Reference: #USERREFRESH2')
        }
      }

      return response.redirect('/user')
    }

    auth.user.displayName = twitchBody.display_name
    auth.user.name = twitchBody.display_name
    auth.user.avatar = twitchBody.profile_image_url
    auth.user.updatedAt = DateTime.fromJSDate(new Date())
    await auth.user.save()

    session.flash('user', 'Successfully refreshed your Twitch data.')

    return response.redirect('/user')
  }
}

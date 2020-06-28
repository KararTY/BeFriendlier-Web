import { DateTime } from 'luxon'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'

import Twitch from '@ioc:Adonis/Addons/Twitch'
import { TwitchUsersBody } from 'src/Twitch' // For type definitions

import User from 'App/Models/User'
import BannedUser from 'App/Models/BannedUser'

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

    // Validate input
    const usersSchema = schema.create({
      favoriteStreamers: schema.array.optional([
        rules.maxLength(5),
        rules.distinct('*'),
      ]).members(schema.string({}, [
        rules.maxLength(32),
        rules.validTwitchName(),
      ])),
      streamerMode: schema.boolean.optional(),
      globalProfile: schema.boolean.optional(),
    })

    const validated = await request.validate({
      schema: usersSchema,
      messages: {
        'favoriteStreamers.maxLength': 'You can only have a maximum of 5 favorite streamers.',
        'favoriteStreamers.distinct': 'Favorite streamers list must have distinct values. No duplicates.',
        'streamerMode.boolean': 'Streamer mode must be a boolean value.',
        'globalProfile.boolean': 'Global profile must be a boolean value.',
      },
    }) // Request may fail here, if values do not pass validation.

    // TODO: OPTIMIZE CALLS BY FILTERING OUT EXISTING FIELDS & ONLY DETACHING NON-EXISTING FIELDS.
    let newFavoriteStreamers: User[] = []
    if (validated.favoriteStreamers !== undefined && validated.favoriteStreamers.length > 0) {
      const existingUsers = await User.query().whereIn('name', validated.favoriteStreamers)
      newFavoriteStreamers.push(...existingUsers)

      // Check if user is requesting streamers that currently do not exist in the database.
      if (existingUsers.length < validated.favoriteStreamers.length) {
        // Time to get the rest of the streamers, if they exist.
        const existingUsernames = existingUsers.map(user => user.name)

        const streamersToFind = validated.favoriteStreamers.filter(user => !existingUsernames.includes(user))

        // Call Twitch API.
        const streamersToAppend = await Twitch.getUser(session.get('token'), streamersToFind)

        if (streamersToAppend instanceof Array) {
          // Check if banned.
          const bannedUserSessionMessages: string[] = []
          const safeUsers: TwitchUsersBody[] = []
          for (let index = 0; index < streamersToAppend.length; index++) {
            const user = streamersToAppend[index]
            const bannedUser = await BannedUser.findBy('twitchID', user.id)

            if (bannedUser !== null) {
              bannedUserSessionMessages.push(`${user.login} is banned from using this service.`)
            } else {
              safeUsers.push(user)
            }
          }

          if (bannedUserSessionMessages.length > 0) {
            session.flash('message', { error: `Error: ${bannedUserSessionMessages.join(' \n')}` })
            return response.redirect('/user')
          }

          const d = await User.createMany(safeUsers.map(streamer => {
            return {
              twitchID: streamer.id,
              name: streamer.login,
              displayName: streamer.display_name,
              avatar: streamer.profile_image_url,
            }
          }))

          newFavoriteStreamers.push(...d)
        } else {
          session.flash('message', { error: 'Error: Something went wrong with Twitch. Try again later.' })
          return response.redirect('/user')
        }
      }
    }

    await auth.user.preload('profile')

    const globalProfile = auth.user.profile.find(profile => profile.chatUserId === 0)

    // Global profile can't be undefined, this is here because typescript is strict.
    if (globalProfile !== undefined) {
      globalProfile.enabled = validated.globalProfile !== undefined

      await auth.user.related('profile').save(globalProfile)
    }

    auth.user.streamerMode = validated.streamerMode !== undefined

    /* This is very inefficient. TODO: FIX */
    // Remove all.
    await auth.user.related('favoriteStreamers').detach()

    // Add new.
    if (newFavoriteStreamers.length > 0) {
      // Filter newFavoriteStreamers for possible duplicates.
      newFavoriteStreamers = newFavoriteStreamers.sort((a, b) => {
        return b.updatedAt.toMillis() - a.updatedAt.toMillis()
      }).filter((streamer, pos, self) => {
        const slf = self.findIndex(user => user.name === streamer.name)
        return slf === pos
      })
      await auth.user.related('favoriteStreamers').saveMany(newFavoriteStreamers)
    }
    /**/

    session.flash('message', { message: 'Successfully updated user settings.' })
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

        await Database.query().from('matches_lists').where('match_user_id', user.id).delete()

        await profile.delete()
      }

      await user.related('favoriteStreamers').detach()

      await user.delete()
      await auth.logout()
      accountDeleted = true
    }

    session.flash('message', accountDeleted
      ? { message: 'Account has been deleted.' }
      // eslint-disable-next-line comma-dangle
      : { error: 'Error: Something went wrong, please try again later! Reference: #USERDELETE1' }
    )

    return response.redirect('/')
  }

  public async refresh ({ auth, response, session }: HttpContextContract) {
    if (auth.user === undefined) {
      return
    }

    if (auth.user.updatedAt.diffNow('minutes').minutes > -5) {
      session.flash('message', {
        error: 'Error: Account has recently been changed. ' +
        // eslint-disable-next-line comma-dangle
        'Please wait at least 5 minutes before refreshing Twitch data.'
      })
      return response.redirect('/user')
    }

    const twitchBody = await Twitch.getUser(session.get('token'))

    if (twitchBody === null) {
      session.flash('message', {
        error: 'Error: Twitch returned nothing after repeated attempts. ' +
        // eslint-disable-next-line comma-dangle
        'Try again later. Reference: #USERREFRESH1'
      })
      return response.redirect('/user')
    }

    auth.user.displayName = twitchBody.display_name
    auth.user.name = twitchBody.login
    auth.user.avatar = twitchBody.profile_image_url
    auth.user.updatedAt = DateTime.fromJSDate(new Date())
    await auth.user.save()

    session.flash('message', { message: 'Successfully refreshed your Twitch data.' })

    return response.redirect('/user')
  }
}

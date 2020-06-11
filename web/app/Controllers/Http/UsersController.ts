import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import Twitch from '@ioc:Adonis/Addons/Twitch'

import { TwitchUsersBody } from 'src/Twitch' // For type definitions

export default class UsersController {
  public async read ({ auth, view }: HttpContextContract) {
    if (typeof auth.user !== 'undefined') {
      await auth.user.preload('profile')
      await auth.user.preload('favoriteStreamers')

      return view.render('core', {
        user: auth.user.toJSON(),
        web: {
          template: 'user',
          title: `User profile - ${auth.user.displayName}`,
        },
      })
    }
  }

  public async update ({ request, session, auth, response }: HttpContextContract) {
    if (typeof auth.user !== 'undefined') {
      const { favoriteStreamers, makeGlobalPublic } = request.post()

      // TODO: OPTIMIZE CALLS BY FILTERING OUT EXISTING FIELDS & ONLY DETACHING NON-EXISTING FIELDS.

      const favoriteStreamersInput: string[] = favoriteStreamers.split(',').filter(Boolean).slice(0, 5)
      const newFavoriteStreamers: User[] = []
      if (favoriteStreamersInput.length > 0) {
        const validStreamerNames: string[] = []
        for (let index = 0; index < favoriteStreamersInput.length; index++) {
          const streamerName = encodeURI(favoriteStreamersInput[index]).normalize()

          // Validate the name.
          if (Boolean(streamerName.match(/[^\w]/)) || streamerName.length >= 32) {
            const malformedName = `${streamerName} is malformed, please only use characters found in twitch usernames.`
            session.flash(`favoriteStreamers[${index}]`, malformedName)
            continue // These are for readability.
          } else {
            validStreamerNames.push(streamerName)
          }
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
          }
        }
      }

      await auth.user.preload('profile')
      const globalProfile = auth.user.profile.find(profile => profile.global)
      // Global profile can't be undefined, this is here because typescript is strict.
      if (globalProfile !== undefined) {
        if (makeGlobalPublic === 'true') {
          // Set global profile to true.

          globalProfile.enabled = true
        } else {
          // Set global profile to false.
          globalProfile.enabled = false
        }

        await auth.user.related('profile').save(globalProfile)
      }

      // Remove all.
      await auth.user.related('favoriteStreamers').detach()

      // Add new.
      await auth.user.related('favoriteStreamers').saveMany(newFavoriteStreamers)

      await auth.user.save()
      return response.redirect('/user')
    }
  }
}

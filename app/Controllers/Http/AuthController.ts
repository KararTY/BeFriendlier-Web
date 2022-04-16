import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Twitch from '@ioc:Befriendlier-Shared/Twitch'
import BannedUser from 'App/Models/BannedUser'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export default class AuthController {
  public async register ({ request, auth, response, session }: HttpContextContract): Promise<void> {
    if (auth.user !== undefined) {
      return response.redirect('/')
    }

    const { code } = request.qs()

    const token = await Twitch.requestToken(code)
    if (token === null) {
      session.flash('message', { error: 'Error: Twitch did not send a token back. Try again later!' })
      return response.redirect('/')
    }

    const twitchUser = await Twitch.getUser(token.access_token)
    if (twitchUser !== null) {
      const bannedUser = await BannedUser.findBy('twitchID', twitchUser.id)
      if (bannedUser !== null) {
        session.flash('message', { error: 'Error: You are banned, 🦆 rubber ducky.' })
        return response.redirect('/')
      }

      const userExists = await User.findBy('twitchID', twitchUser.id)

      if (userExists === null) {
        // Register account
        const user = await User.create({
          twitchID: twitchUser.id,
          name: twitchUser.login,
          displayName: twitchUser.display_name,
          avatar: twitchUser.profile_image_url
        })

        // Create default global profile, but not enabled.
        await user.related('profile').create({
          enabled: false,
          chatUserId: 0
        })

        await user.save()

        await auth.login(user)

        session.put('token', token.access_token)
        session.put('refresh', token.refresh_token)

        session.flash('message', { message: 'Welcome! Take a look at your user settings to finalize your setup!' })
        return response.redirect('/')
      } else {
        // User exists.
        let flashMessage = 'Welcome back!'

        // Check if not actually registered, and only just cached. For "favorite streamers" purposes.
        await userExists.load('profile')
        if (userExists.profile.length === 0) {
          await userExists.related('profile').create({
            enabled: false,
            chatUserId: 0
          })

          userExists.createdAt = DateTime.fromJSDate(new Date())
          flashMessage = 'Welcome! Take a look at your user settings to finalize your setup!'
          await userExists.save()
        }

        // Login
        await auth.login(userExists)

        session.put('token', token.access_token)
        session.put('refresh', token.refresh_token)

        session.flash('message', { message: flashMessage })
        return response.redirect('/')
      }
    }
  }

  public async logout ({ auth, session, response }: HttpContextContract): Promise<void> {
    await auth.logout()

    session.flash('message', { message: 'Goodbye. See you later!' })
    return response.redirect('/')
  }
}

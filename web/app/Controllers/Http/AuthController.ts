import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'

import Twitch from '@ioc:Adonis/Addons/Twitch'

import User from 'App/Models/User'

export default class AuthController {
  public async register ({ request, auth, response, session }: HttpContextContract) {
    const { code } = request.get()

    const token = await Twitch.requestToken(code)
    if (token === null) {
      session.flash('message', { error: 'Error: Twitch did not send a token back. Try again later!' })
      return response.redirect('/')
    }

    const twitchUser = await Twitch.getUser(token.access_token)
    if (twitchUser !== null) {
      const userExists = await User.findBy('twitchID', twitchUser.id)

      if (userExists === null) {
        // Register account
        const user = await User.create({
          twitchID: twitchUser.id,
          name: twitchUser.login,
          displayName: twitchUser.display_name,
          avatar: twitchUser.profile_image_url,
        })

        // Create default global profile, but not enabled.
        await user.related('profile').create({
          enabled: false,
          chatUserId: 0,
        })

        await user.save()

        if (Env.get('NODE_ENV') === 'development') {
          const testUser = await User.findBy('twitchID', '0')
          if (testUser === null) {
            throw new Error('Using NODE_ENV=development without existing TestUser.' +
            'Run `npm run seed` (`node ace db:seed`).')
          } else {
            await auth.login(testUser)
          }
        } else {
          await auth.login(user)
        }
        session.put('token', token.access_token)
        session.put('refresh', token.refresh_token)

        session.flash('message', { message: 'Welcome! Take a look at your user settings to finalize your setup!' })
        return response.redirect('/')
      } else {
        // Exists but not actually registered, just cached. For "favorite streamers" purposes.
        await userExists.preload('profile')
        if (userExists.profile.length === 0) {
          await userExists.related('profile').create({
            enabled: false,
            chatUserId: 0,
          })
        }

        // Login
        if (Env.get('NODE_ENV') === 'development') {
          const testUser = await User.findBy('twitchID', '0')
          if (testUser === null) {
            throw new Error('Using NODE_ENV=development without existing TestUser.' +
            'Run `npm run seed` (`node ace db:seed`).')
          } else {
            await auth.login(testUser)
          }
        } else {
          await auth.login(userExists)
        }

        session.put('token', token.access_token)
        session.put('refresh', token.refresh_token)

        session.flash('message', { message: 'Welcome back!' })
        return response.redirect('/')
      }
    }
  }

  public async logout ({ auth, session, response }: HttpContextContract) {
    await auth.logout()

    session.flash('message', { message: 'Goodbye. See you later!' })
    return response.redirect('/')
  }
}

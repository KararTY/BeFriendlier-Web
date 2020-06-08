import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Twitch from '@ioc:Adonis/Addons/Twitch'

import User from 'App/Models/User'

export default class AuthController {
  public async register ({ request, auth, response, session }: HttpContextContract) {
    const { code } = request.get()

    const token = await Twitch.requestToken(code)
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

        // Create default public profile, disabled.
        await user.related('profile').create({
          enabled: false,
          global: true,
        })

        await user.save()
        session.put('token', token.access_token)
        return response.redirect('/user')
      } else {
        // Exists but not actually registered, just cached.
        await userExists.preload('profile')
        if (userExists.profile.length === 0) {
          await userExists.related('profile').create({
            enabled: false,
            global: true,
          })
        }

        // Login
        await auth.login(userExists)
        session.put('token', token.access_token)
        return response.redirect('/user')
      }
    }
  }

  public async logout ({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.redirect('/')
  }
}

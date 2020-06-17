import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import Profile from 'App/Models/Profile'

export default class ProfilesController {
  public async profile ({ params, auth, view, response }: HttpContextContract) {
    if (typeof auth.user !== 'undefined') {
      const { id } = params
      if (typeof id === 'string') {
        const idNumber = Number(id)
        // Make sure it's a number.
        if (Number.isNaN(idNumber)) {
          return response.badRequest('Parameter is not a number.')
        }

        const profile = await Profile.find(Number(id))

        if (profile !== null) {
          const ownProfile = profile.userId === auth.user.id
          if (ownProfile) {
            // If own, allow access.
            await profile.preload('matches')

            let chat: User | null = null
            if (profile.chatId !== null && !profile.global) {
              chat = await User.find(profile.chatId)
              // Should not happen, ever.
              if (chat === null) {
                return response.partialContent('Chat owner is missing. Report this error in github.')
              }
            }

            return view.render('core', {
              user: auth.user.toJSON(),
              profile: profile.toJSON(),
              web: {
                template: 'profile',
                title: chat !== null ? `Profile in ${chat.name}'s chat` : 'Global profile',
              },
            })
          } else {
            // If someone else's, check if they've matched for that specific profile.

          }
        }

        // Disallow access.
        return response.redirect('/')
      } else {
        // Show user's profiles.
        const profiles: any[] = []

        await auth.user.preload('profile')
        for (let index = 0; index < auth.user.profile.length; index++) {
          const profile = auth.user.profile[index]
          const profileJSON = profile.toJSON()

          if (profile.chatId !== null) {
            const user = await User.find(profile.chatId)
            if (user !== null) {
              profileJSON.chat = user.toJSON()
              profiles.push(profileJSON)
            }
          } else {
            profiles.push(profileJSON)
          }
        }

        return view.render('core', {
          user: auth.user.toJSON(),
          profiles,
          web: {
            template: 'profiles',
            title: 'Profiles',
          },
        })
      }
    }
  }
}

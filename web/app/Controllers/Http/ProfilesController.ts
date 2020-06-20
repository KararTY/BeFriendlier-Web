import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import Profile from 'App/Models/Profile'

export default class ProfilesController {
  public async read ({ params, auth, view, session, response }: HttpContextContract) {
    const { id } = params

    if (auth.user === undefined) {
      return
    }

    const authID = auth.user.id

    if (typeof id === 'string') {
      const idNumber = Number(id)
      // Make sure it's a number.
      if (Number.isNaN(idNumber)) {
        return response.badRequest('Parameter is not a number.')
      }

      const profile = await Profile.find(Number(id))

      if (profile !== null) {
        const ownProfile = profile.userId === authID

        let chat: User | null = null
        if (profile.chatId !== null && !profile.global) {
          chat = await User.find(profile.chatId)
          // Should not happen, ever.
          if (chat === null) {
            return response.partialContent('Chat owner is missing. Report this error in github.')
          }
        }

        await profile.preload('matches')

        if (ownProfile) {
          // If own, allow access.
          return view.render('core', {
            user: auth.user.toJSON(),
            profile: profile.toJSON(),
            web: {
              template: 'profile',
              title: chat !== null ? `Your profile in ${chat.name}'s chat` : 'Your global profile',
            },
          })
        } else {
          // If someone else's, check if they've matched for that specific profile.
          const matched = profile.matches.find(match => match.id === authID)
          if (matched !== null) {
            const userOfProfile = await User.find(profile.userId)
            if (userOfProfile !== null) {
              delete profile.matches // We don't want to send that user's matches.
              return view.render('core', {
                user: auth.user.toJSON(),
                profile: profile.toJSON(),
                profileUser: userOfProfile.toJSON(), // Required.
                guest: true, // Required.
                web: {
                  template: 'profile',
                  title: chat !== null
                    ? `${userOfProfile.name}'s profile in ${chat.name}'s chat`
                    : `${userOfProfile.name}'s global profile`,
                },
              })
            }
          }
        }
      }

      // Disallow access.
      session.flash('splash', 'Error: You are not allowed access to that profile!')
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

  public async update ({ params, auth, view, response }: HttpContextContract) {}

  public async delete ({ params, auth, response, session }: HttpContextContract) {
    const { id } = params
    if (auth.user === undefined) {
      return
    }

    await auth.user.preload('profile')

    const profile = auth.user.profile.find(profile => profile.id === id)
    if (profile !== undefined) {
      await profile.delete()
      session.flash('profiles', 'Profile has been deleted.')
    }

    return response.redirect('/profile/')
  }
}

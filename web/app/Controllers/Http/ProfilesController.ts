import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

import User from 'App/Models/User'
import Profile from 'App/Models/Profile'

export default class ProfilesController {
  public async read ({ params, auth, view, session, response }: HttpContextContract) {
    if (auth.user === undefined) {
      return
    }

    const { id } = params

    if (id === undefined) {
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
    } else {
      const authID = auth.user.id

      const idNumber = Number(id)
      if (Number.isNaN(idNumber)) {
      // Make sure it's a number.
        session.flash('message', { error: 'Error: Parameter is not a number. Profile url can only contain numbers.' })
        return response.redirect('/')
      }

      const profile = await Profile.find(Number(id))

      if (profile === null) {
        session.flash('message', { error: 'Error: Profile does not exist.' })
        return response.redirect('/')
      }

      const ownProfile = profile.userId === authID

      let chat: User | null = null
      if (profile.chatId !== null && !profile.global) {
        chat = await User.find(profile.chatId)
        // Should not happen, ever.
        if (chat === null) {
          session.flash('message', { error: 'Error: Chat owner is missing. Report this error on github.' })
          return response.redirect('/profile/')
        }
      }

      await profile.preload('matches')
      await auth.user.preload('favoriteStreamers')

      const userJSON = auth.user.toJSON()
      const profileJSON = profile.toJSON()

      if (ownProfile) {
      // If own, allow access.
        return view.render('core', {
          user: userJSON,
          profile: profileJSON,
          profileUser: userJSON,
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

            await userOfProfile.preload('favoriteStreamers')

            return view.render('core', {
              user: userJSON,
              profile: profileJSON,
              profileUser: userOfProfile.toJSON(),
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
        // Disallow access.
        session.flash('message', { error: 'Error: You are not allowed access to that profile!' })
        return response.redirect('/')
      }
    }
  }

  public async update ({ params, request, session, auth, response }: HttpContextContract) {
    if (auth.user === undefined) {
      return
    }

    const id = params.id as string

    const idNumber = Number(id)
    if (Number.isNaN(idNumber)) {
      // Make sure it's a number.
      session.flash('message', { error: 'Error: Parameter is not a number. Profile url can only contain numbers.' })
      return response.redirect('/profile/')
    }

    // Validate input
    const profilesSchema = schema.create({
      bio: schema.string({}, [
        rules.maxLength(128),
        rules.minLength(1),
      ]),
      color: schema.string({}, [
        rules.hexColorString(),
      ]),
    })

    const validated = await request.validate({
      schema: profilesSchema,
    }) // Request may fail here if values do not pass validation.

    const profile = await Profile.find(idNumber)

    if (profile === null) {
      session.flash('message', { error: 'Error: Profile does not exist.' })
      return response.redirect('/profile/')
    }

    const ownProfile = profile.userId === auth.user.id

    if (ownProfile) {
      profile.color = validated.color
      profile.bio = validated.bio

      await profile.save()
      session.flash('message', { message: 'Successfully updated your profile.' })
      return response.redirect(`/profile/${id}`)
    } else {
      // Disallow access.
      session.flash('message', { error: 'Error: You are not allowed access to that profile!' })
      return response.redirect('/profile/')
    }
  }

  public async delete ({ params, auth, response, session }: HttpContextContract) {
    if (auth.user === undefined) {
      return
    }

    const { id } = params

    await auth.user.preload('profile')

    const profile = auth.user.profile.find(profile => profile.id === id)
    if (profile !== undefined) {
      await profile.preload('matches')

      await profile.related('matches').detach()

      await profile.delete()
      session.flash('message', { message: 'Profile has been deleted.' })
    }

    return response.redirect('/profile/')
  }

  public async unmatch ({ params, request, auth, response }: HttpContextContract) {
    if (auth.user === undefined) {
      return
    }

    const method = request.intended()
    if (method !== 'POST') {
      return
    }

    const { id } = params
    const { userId } = request.post()

    if (userId === undefined) {
      return response.badRequest({ error: 'Body must contain { userId: number }.' })
    }

    const idNumber = Number(id)
    if (Number.isNaN(idNumber)) {
      // Make sure it's a number.
      return response.badRequest({ error: 'Parameter is not a number. Profile url can only contain numbers.' })
    }

    const profile = await Profile.find(idNumber)

    if (profile === null) {
      return response.notFound({ error: 'Profile does not exist.' })
    }

    const ownProfile = profile.userId === auth.user.id

    if (ownProfile) {
      await profile.preload('matches')

      const match = profile.matches.find(user => user.id === userId)

      if (match !== undefined) {
        await profile.related('matches').detach([match.id])

        return response.ok({ success: true })
      } else {
        return response.notFound({ error: 'Could not remove. That match does not exist.' })
      }
    } else {
      // Disallow access.
      return response.forbidden({ error: 'You are not allowed access to that profile!' })
    }
  }
}

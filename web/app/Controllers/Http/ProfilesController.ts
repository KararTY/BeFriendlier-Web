import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'

import User from 'App/Models/User'
import Profile from 'App/Models/Profile'

export default class ProfilesController {
  private readonly profilesSchema = schema.create({
    bio: schema.string({}, [
      rules.maxLength(128),
      rules.minLength(1),
    ]),
    color: schema.string({}, [
      rules.hexColorString(),
    ]),
  })

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

        if (profile.chatUserId !== 0) {
          const user = await User.find(profile.chatUserId)
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
      if (profile.chatUserId !== 0) {
        chat = await User.find(profile.chatUserId)
        // Should not happen, ever.
        if (chat === null) {
          session.flash('message', { error: 'Error: Chat owner is missing. Report this error on github.' })
          return response.redirect('/profile/')
        }
      }

      await auth.user.preload('favoriteStreamers')

      const userJSON = auth.user.toJSON()
      const profileJSON = profile.toJSON()

      const matches = await profile.related('matches').query().limit(10)
      if (matches !== null) {
        profileJSON.matches = []
        for (let index = 0; index < matches.length; index++) {
          const profile = matches[index]
          const user = await User.find(profile.userId)

          if (user !== null) {
            profileJSON.matches.push({
              profile: profile.toJSON(),
              user: user.toJSON(),
            })
          }
        }
      }

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
        // If someone else's, check if this user has matched for that specific profile.
        const match = await Database.query().from('matches_lists').where({
          profile_id: profile.id,
          match_user_id: authID,
        }).first()

        if (match !== null) {
          const userOfProfile = await User.find(profile.userId)
          if (userOfProfile !== null) {
            await userOfProfile.preload('favoriteStreamers')

            return view.render('core', {
              user: userJSON,
              profile: profileJSON,
              profileUser: userOfProfile.toJSON(),
              web: {
                template: 'profile',
                title: chat !== null
                  ? `${userOfProfile.name}'s profile in ${chat.name}'s chat`
                  : `${userOfProfile.name}'s global profile`,
              },
            })
          }
        }

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
      session.flash('message', { error: 'Error: Parameter is not a number. Profile url can only contain numbers.' })
      return response.redirect('/profile/')
    }

    // Validate input
    const validated = await request.validate({
      schema: this.profilesSchema,
      cacheKey: 'profilesSchema',
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
      await profile.related('matches').detach()

      await Database.query().from('matches_lists').where('match_profile_id', profile.id).delete()

      await profile.delete()
      session.flash('message', { message: 'Profile has been deleted.' })
    }

    return response.redirect('/profile/')
  }

  public async matches ({ params, request, auth, response }: HttpContextContract) {
    if (auth.user === undefined) {
      return
    }

    const method = request.intended()
    if (method !== 'POST') {
      return
    }

    const { id } = params
    const { pagination } = request.get()

    const idNumber = Number(id)
    if (Number.isNaN(idNumber)) {
      return response.badRequest({ error: 'Error: Parameter is not a number. Profile url can only contain numbers.' })
    }

    const paginationNumber = Number(pagination)
    if (Number.isNaN(paginationNumber)) {
      return response.badRequest({ error: 'Error: Pagination get() query is not a number.' })
    }

    const profile = await Profile.find(idNumber)

    if (profile === null) {
      return response.notFound({ error: 'Error: Profile does not exist.' })
    }

    const ownProfile = profile.userId === auth.user.id

    if (ownProfile) {
      const matches = await profile.related('matches').query().offset(paginationNumber).limit(10)
      const matchesJSON: any[] = []

      if (matches !== null) {
        for (let index = 0; index < matches.length; index++) {
          const profile = matches[index]
          const user = await User.find(profile.userId)

          if (user !== null) {
            matchesJSON.push({
              profile: profile.toJSON(),
              user: user.toJSON(),
            })
          }
        }
      }

      return response.json(matchesJSON)
    } else {
      return response.forbidden({ error: 'Error: You are not allowed access to that profile!' })
    }
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
    const { profileID } = request.post()

    if (profileID === undefined) {
      return response.badRequest({ error: 'Error: Body must contain { profileID: number }.' })
    }

    const profileIDNumber = Number(profileID)
    if (Number.isNaN(profileIDNumber)) {
      return response.badRequest({ error: 'Error: profileID is not a number.' })
    }

    const idNumber = Number(id)
    if (Number.isNaN(idNumber)) {
      return response.badRequest({ error: 'Error: Parameter is not a number. Profile url can only contain numbers.' })
    }

    const profile = await Profile.find(idNumber)

    if (profile === null) {
      return response.notFound({ error: 'Error: Profile does not exist.' })
    }

    const ownProfile = profile.userId === auth.user.id

    if (ownProfile) {
      const match = await profile.related('matches').query().where('id', profileIDNumber).first()

      if (match === null) {
        return response.notFound({ error: 'Error: Could not remove. That matched profile does not exist.' })
      }

      // Remove match from this profile.
      await profile.related('matches').detach([match.id])

      // Remove match from match's profile
      await Database.from('matches_lists').where({
        profile_id: profileIDNumber,
        match_user_id: auth.user.id,
        match_profile_id: profile.id,
      }).delete()

      return response.ok({ message: 'Successfully removed match from profile.' })
    } else {
      return response.forbidden({ error: 'Error: You are not allowed access to that profile!' })
    }
  }
}

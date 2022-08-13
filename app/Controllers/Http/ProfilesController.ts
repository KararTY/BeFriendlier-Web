import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import { ModelObject } from '@ioc:Adonis/Lucid/Orm'
import PajbotAPI from '@ioc:Befriendlier-Shared/PajbotAPI'
import Emote from 'App/Models/Emote'
import Profile from 'App/Models/Profile'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

const profileThemes = ['white', 'black', 'orange', 'yellow', 'cyan', 'purple']

export default class ProfilesController {
  public async read ({ params, auth, view, session, response }: HttpContextContract): Promise<undefined | string> {
    if (auth.user === undefined) {
      return
    }

    const { id } = params

    if (id === undefined) {
      // Show all user's profiles.
      const profiles = await this.getAllProfilesForUser(auth.user)

      return await view.render('core', {
        user: auth.user,
        profiles,
        web: {
          template: 'profiles',
          title: `User profiles - ${auth.user.displayName}`
        }
      })
    }

    // Request has an id in parameter (url): We're looking for a profile...
    const authID = auth.user.id

    const idNumber = Number(id)
    if (Number.isNaN(idNumber)) {
      session.flash('message', { error: this.Error.parameterBadRequest })
      return response.redirect('/') as undefined
    }

    const profile = await Profile.find(Number(id))

    if (profile === null) {
      session.flash('message', { error: this.Error.notFound })
      return response.redirect('/') as undefined
    }

    const ownProfile = profile.userId === authID

    let chat: User | null = null
    // "chatUserId === 0" notates a global profile. It doesn't exist by design, so don't check for it.
    if (profile.chatUserId !== 0) {
      chat = await User.find(profile.chatUserId)
      // Should not happen, ever.
      if (chat === null) {
        session.flash('message', { error: this.Error.noOwner })
        return response.redirect('/profile/') as undefined
      }
    }

    await auth.user.load('favoriteStreamers')
    await auth.user.load('emotes')

    const totalEmotes = auth.user.emotes.reduce((acc, cur) => acc + (cur.amount ?? 0), 0)

    const userJSON = auth.user.serialize()
    userJSON.totalEmotes = totalEmotes

    const profileJSON = profile.serialize()

    profileJSON.matches = await this.getMatchesList(auth.user, profile, 0)
    profileJSON.favorite_emotes = await Emote.findMany(profile.favoriteEmotes)

    if (ownProfile) {
      // If own, allow access.
      return await view.render('core', {
        user: auth.user,
        profile: profileJSON,
        profileUser: userJSON,
        profileChatUser: (chat != null) ? chat.name : 'befriendlier',
        web: {
          template: 'profile',
          title: chat !== null ? `Your profile in ${chat.name}'s chat` : 'Your global profile',
          profileThemes
        }
      })
    }

    // If someone else's, check if the requested profile has matched this requesting user.
    const match = await Database.query().from('matches_lists').where({
      profile_id: profile.id,
      match_user_id: authID
    }).first()

    if (match === null) {
      // The requested profile hasn't matched with this requesting user.
      session.flash('message', { error: this.Error.forbidden })
      return response.redirect('/') as undefined
    }

    // And check if the requesting user has matched for that specific profile.
    const hasMatched = await Database.query().from('matches_lists').where({
      user_id: auth.user.id,
      match_profile_id: profile.id
    }).first()

    if (hasMatched === null) {
      // This requesting user hasn't matched with the requested profile.
      session.flash('message', { error: this.Error.forbidden })
      return response.redirect('/') as undefined
    }

    const userOfProfile = await User.find(profile.userId)

    if (userOfProfile === null) {
      // The requested profile doesn't have an existing owner? This shouldn't happen.
      session.flash('message', { error: this.Error.noOwner })
      return response.redirect('/profile') as undefined
    }

    await userOfProfile.load('favoriteStreamers')
    await userOfProfile.load('emotes')

    const userOfProfileTotalEmotes = userOfProfile.emotes.reduce((acc, cur) => acc + (cur.amount ?? 0), 0)

    const userOfProfileJSON = userOfProfile.serialize()
    userOfProfileJSON.totalEmotes = userOfProfileTotalEmotes

    return await view.render('core', {
      user: auth.user,
      profile: profileJSON,
      profileUser: userOfProfileJSON,
      web: {
        template: 'profile',
        title: chat !== null
          ? `${userOfProfile.name}'s profile in ${chat.name}'s chat`
          : `${userOfProfile.name}'s global profile`
      }
    })
  }

  public async update ({ params, request, session, auth, response }: HttpContextContract): Promise<void> {
    if (auth.user === undefined) {
      return
    }

    const id = params.id as string

    const idNumber = Number(id)
    if (Number.isNaN(idNumber)) {
      session.flash('message', { error: this.Error.parameterBadRequest })
      return response.redirect('/profile/')
    }

    const profile = await Profile.find(idNumber)

    if (profile === null) {
      session.flash('message', { error: this.Error.notFound })
      return response.redirect('/profile/')
    }

    // Is this the user's profile?
    if (profile.userId !== auth.user.id) {
      session.flash('message', { error: this.Error.forbidden })
      return response.redirect('/profile/')
    }

    // Remove some characters.
    request.updateBody({
      color: request.input('color', '#ffffff'),
      theme: request.input('theme', 'white'),
      bio: (request.input('bio', '') ?? '').normalize().replace(/[\uE000-\uF8FF]+/gu, '').replace(/[\u{000e0000}]/gu, '').trim()
    })

    if (profile.updatedAt.diffNow('seconds').seconds > -60) {
      const { bio, color, theme } = request.body()
      session.flash('message', {
        error: 'Error: Profile has recently been changed. ' +
          'Please wait at least 1 minute before updating your profile.'
      })
      session.flash('bio', bio)
      session.flash('color', color)
      session.flash('theme', theme)

      return response.redirect(`/profile/${id}`)
    }

    profile.updatedAt = DateTime.fromJSDate(new Date())
    await profile.save()

    // Validate input
    const validated = await request.validate({
      schema: this.profilesSchema,
      cacheKey: 'profilesSchema'
    }) // Request may fail here if values do not pass validation.

    profile.color = validated.color
    profile.theme = validated.theme

    /**
     * Sometimes PerspectiveAPI or Pajbot v1/v2 is unavailable, that's why we save at multiple stages.
     * (At this point, at least color & theme was set.)
     */
    await profile.save()

    profile.bio = validated.bio

    const chatOwnerUser = await User.find(profile.chatUserId) as User

    const checkMessages: Array<{ error: string, message: string }> = []

    const pajbotCheck = await PajbotAPI.check(chatOwnerUser.name, profile.bio)
    if (pajbotCheck === null) {
      checkMessages.push({
        error: 'Please try setting this later when the Banphrase v1 API is online.',
        message: 'Banphrase v1 API is offline.'
      })
    } else if (pajbotCheck.banned) {
      const banphraseData = pajbotCheck.banphrase_data as { phrase: string }
      Logger.warn('"%s" contains bad words (%s)', profile.bio, JSON.stringify(pajbotCheck.banphrase_data))
      checkMessages.push({
        error: `🦆 Please remove: ${banphraseData?.phrase}`,
        message: 'Error: There are banned phrases (Banphrase v1) in your bio!'
      })
    }

    const pajbot2Check = await PajbotAPI.checkVersion2(chatOwnerUser.name, profile.bio)
    if (pajbot2Check === null) {
      checkMessages.push({
        error: 'Please try setting this later when the Banphrase v2 API is online.',
        message: 'Banphrase v2 API is offline.'
      })
    } else if (pajbot2Check.banned) {
      const filterData = pajbot2Check.filter_data as Array<{ mute_type: number, reason: string }>
      Logger.warn('"%s" contains bad words (%s)', profile.bio, JSON.stringify(pajbot2Check.filter_data))
      checkMessages.push({
        error: filterData.map(data => data.reason).join('\n '),
        message: 'Error: There are banned phrases (Banphrase v2) in your bio!'
      })
    }

    if (checkMessages.length > 0) {
      session.flash('message', { error: checkMessages.map(cm => cm.message).join('\r\n') })
      session.flash('errors', { bio: checkMessages.map(cm => cm.error) })
      session.flash('bio', profile.bio)
      return response.redirect(`/profile/${id}`)
    }

    await profile.save()

    session.flash('message', { message: 'Successfully updated your profile.' })
    return response.redirect(`/profile/${id}`)
  }

  public async delete ({ params, auth, response, session }: HttpContextContract): Promise<void> {
    if (auth.user === undefined) {
      return
    }

    const { id } = params

    const idNumber = Number(id)
    if (Number.isNaN(idNumber)) {
      session.flash('message', { error: this.Error.parameterBadRequest })
      return response.redirect('/profile/')
    }

    await auth.user.load('profile')

    const profile = auth.user.profile.find(profile => profile.id === idNumber)
    if (profile !== undefined) {
      await profile.related('matches').detach()

      // Remove all matches to this profile.
      await Database.query().from('matches_lists').where('matchProfileId', profile.id).delete()

      // Anonymize profile
      profile.bio = ''
      profile.favoriteEmotes = []
      profile.color = '#ffffff'
      profile.enabled = false
      profile.userId = -1
      profile.createdAt = DateTime.fromJSDate(new Date())
      // profile.updatedAt automatically changes as soon as we save this.

      await profile.save()

      session.flash('message', { message: 'Profile has been deleted.' })
    }

    return response.redirect('/profile/')
  }

  public async matchesJSONPagination ({ params, request, auth, response }: HttpContextContract): Promise<void> {
    if (auth.user === undefined) {
      return
    }

    const method = request.intended()
    if (method !== 'POST') {
      return
    }

    const { id } = params
    const { pagination } = request.qs()

    const idNumber = Number(id)
    if (Number.isNaN(idNumber)) {
      return response.badRequest({ error: this.Error.parameterBadRequest })
    }

    const paginationNumber = Number(pagination)
    if (Number.isNaN(paginationNumber)) {
      return response.badRequest({ error: this.Error.paginationGetBadRequest })
    }

    const profile = await Profile.find(idNumber)

    if (profile === null) {
      return response.notFound({ error: this.Error.notFound })
    }

    const ownProfile = profile.userId === auth.user.id

    if (ownProfile) {
      const matchesJSON = await this.getMatchesList(auth.user, profile, paginationNumber)

      return response.json(matchesJSON)
    } else {
      return response.forbidden({ error: this.Error.forbidden })
    }
  }

  public async unmatch ({ params, request, auth, response }: HttpContextContract): Promise<void> {
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
      return response.badRequest({ error: this.Error.bodyBadRequest })
    }

    const profileIDNumber = Number(profileID)
    if (Number.isNaN(profileIDNumber)) {
      return response.badRequest({ error: this.Error.idBadRequest })
    }

    const idNumber = Number(id)
    if (Number.isNaN(idNumber)) {
      return response.badRequest({ error: this.Error.parameterBadRequest })
    }

    const profile = await Profile.find(idNumber)

    if (profile === null) {
      return response.notFound({ error: this.Error.notFound })
    }

    const ownProfile = profile.userId === auth.user.id

    if (ownProfile) {
      const match = await profile.related('matches').query().where('id', profileIDNumber).first()

      if (match === null) {
        return response.notFound({ error: this.Error.notFound })
      }

      // We don't want to attempt to match with this user again in the future, so add them to the mismatches list.
      profile.mismatches.push(match.id)

      await profile.save()

      // Remove match from this profile.
      await profile.related('matches').detach([match.id])

      return response.ok({ message: 'Successfully removed match from profile.' })
    } else {
      return response.forbidden({ error: this.Error.forbidden })
    }
  }

  private async getAllProfilesForUser (user: User): Promise<ModelObject[]> {
    const profiles: ModelObject[] = []

    await user.load('profile')

    for (let index = 0; index < user.profile.length; index++) {
      const profile = user.profile[index]
      const profileJSON = profile.serialize()

      if (profile.chatUserId !== 0) {
        const matchedProfileUser = await User.find(profile.chatUserId)
        if (matchedProfileUser !== null) {
          profileJSON.chat = matchedProfileUser.serialize()
          profiles.push(profileJSON)
        }
      } else {
        profiles.push(profileJSON)
      }
    }

    // Sort by ascending order.
    profiles.sort((a, b) => a.id - b.id)

    return profiles
  }

  private async getMatchesList (user: User, profile: Profile, pagination = 0): Promise<any[] | undefined> {
    const matches = await profile.related('matches').query()
    const matchesJSON: any[] = []

    if (matches !== null) {
      for (let index = 0; index < matches.length; index++) {
        const profileMatched = matches[index]
        const userMatched = await User.find(profileMatched.userId)

        if (userMatched === null) {
          continue
        }

        /**
         * Make sure user has also matched with us before sending it.
         * Do not ruin the surprise if they're not matched yet.
         */

        // Someone else's, check if the requested profile has matched this requesting user.
        const hasMatched = await Database.query().from('matches_lists').where({
          profile_id: profileMatched.id,
          match_user_id: user.id
        }).first()

        if (hasMatched === null) {
          continue
        }

        matchesJSON.push({
          profile: profileMatched.serialize(),
          user: userMatched.serialize()
        })
      }

      return matchesJSON.slice(pagination).slice(0, 10)
    }
  }

  private readonly profilesSchema = schema.create({
    bio: schema.string({}, [
      rules.maxLength(128),
      rules.minLength(3),
      rules.nonToxicBio()
    ]),
    color: schema.string({}, [
      rules.hexColorString()
    ]),
    theme: schema.enum([...profileThemes] as const)
  })

  private readonly Error = {
    forbidden: 'Error: You are not allowed access to that profile!',
    notFound: 'Error: Profile does not exist.',
    parameterBadRequest: 'Error: Parameter is not a number. Profile url can only contain numbers.',
    noOwner: 'Error: Chat owner is missing. Report this error on github.',
    bodyBadRequest: 'Error: Body must contain { profileID: number }.',
    idBadRequest: 'Error: profileID is not a number.',
    paginationGetBadRequest: 'Error: Pagination GET query is not a number.'
  }
}

import Logger from '@ioc:Adonis/Core/Logger'
import Database from '@ioc:Adonis/Lucid/Database'
import Profile from 'App/Models/Profile'
import User from 'App/Models/User'
import { BASE, ROLLMATCH, MessageType, UNMATCH } from 'befriendlier-shared'

class Match {
  /**
   * MAKE SURE TO CATCH ERRORS.
   */
  public async rollMatch ({ userTwitch, channelTwitch }: ROLLMATCH) {
    const { chatOwnerUser, profile } = await this.findProfileByChatOwner(userTwitch.id, channelTwitch.id)

    if (profile.rolls.length > 0) {
      // Return match
      const { rolls, user: matchUser, profile: matchProfile } = await this.rollUntilAvailableUser(profile.rolls)

      // We don't need to save the array if it's not been edited.
      if (rolls instanceof Array && rolls.length !== profile.rolls.length) {
        profile.rolls = rolls as number[]
        await profile.save()
      }

      return { user: matchUser as User, profile: matchProfile as Profile }
    }

    if (profile.nextRoll.diffNow('hours').hours < 0) {
      throw new Error(MessageType.TAKEABREAK)
    }

    await profile.preload('matches')

    // Find matches in the same chat, filter away mismatches and current matches, limit to 10.
    const profiles = await Profile.query()
      .where('chatUserId', chatOwnerUser.id)
      .whereNotIn('id', profile.mismatches.concat(profile.matches.map(match => match.id)))
      .limit(10)

    // Shuffle the array!
    this.durstenfeldShuffle(profiles)

    profile.rolls = profiles.map(i => i.id)

    // Ratelimit user's rolls to every 5 hours.
    profile.nextRoll = profile.nextRoll.plus({ hours: 5 })

    await profile.save()

    const user = await this.findUserByProfile(profiles[0])

    return { user: user, profile: profiles[0] }
  }

  /**
   * MAKE SURE TO CATCH ERRORS.
   */
  public async match ({ userTwitch, channelTwitch }: BASE) {
    const { user, profile } = await this.findProfileByChatOwner(userTwitch.id, channelTwitch.id)

    const profileId = profile.rolls.shift()

    const matchProfile = await Profile.find(profileId)

    if (matchProfile === null) {
      // Shouldn't hit here, maybe user deleted as soon as they tried to match.
      Logger.error(`Tried to match with an unknown profile. profileId: ${String(profileId)}`)
      throw new Error(MessageType.TAKEABREAK)
    }

    // Add match for this profile.
    await profile.related('matches').attach([matchProfile.id])

    // Check if matched profile also has this user as a match, if so, announce match to both users.
    const hasMatched = await Database.query().from('matches_lists').where({
      profile_id: matchProfile.id,
      match_user_id: user.id,
    }).first()

    const matchUser = await this.findUserByProfile(matchProfile)

    if (matchUser === null) {
      // Shouldn't hit here, maybe user deleted as soon as they tried to match.
      Logger.error(`Tried to match with an unknown user. userId:${matchProfile.userId}, profileId: ${String(profileId)}`)
      throw new Error(MessageType.TAKEABREAK)
    }

    await profile.save()

    if (hasMatched !== null) {
      return { attempt: MessageType.SUCCESS, user, matchUser }
    } else {
      return { attempt: MessageType.MATCH }
    }
  }

  /**
   * MAKE SURE TO CATCH ERRORS.
   */
  public async unmatch ({ userTwitch, matchUserTwitch, channelTwitch }: UNMATCH) {
    const { profile } = await this.findProfileByChatOwner(userTwitch.id, channelTwitch.id)

    const matchUser = await User.findBy('twitchID', matchUserTwitch.id)

    if (matchUser === null) {
      // Shouldn't hit here, maybe user deleted as soon as they tried to unmatch.
      Logger.error(`Tried to match with an unknown user. matchUserTwitch.id:${String(matchUserTwitch.id)}, matchUserTwitch.name:${String(matchUserTwitch.name)}, profileId: ${String(profile.id)}`)
      throw new Error(MessageType.TAKEABREAK)
    }

    const res = await Database.query().from('matches_lists').where({
      profile_id: profile.id,
      match_user_id: matchUser.id,
    }).delete()

    Logger.debug(JSON.stringify(res))
  }

  private async findUserByProfile (profile: Profile) {
    const user = await User.find(profile.userId)

    if (user === null) {
      // Shouldn't hit this at all.
      Logger.error(`Tried to find a profile's user. profile.id: ${profile.id}, profile.userId: ${profile.userId}`)
      throw new Error()
    }

    return user
  }

  private async rollUntilAvailableUser (rolls: number[]) {
    if (rolls.length === 0) {
      return new Error(MessageType.TAKEABREAK)
    }

    const profile = await Profile.find(rolls[0])
    if (profile === null) {
      // User probably deleted, reroll again.
      rolls.shift()
      return this.rollUntilAvailableUser(rolls)
    }

    const user = await this.findUserByProfile(profile)

    return { rolls, user, profile }
  }

  private async findProfileByChatOwner (userId: string, channelId: string) {
    const user = await User.findBy('twitchID', userId)
    if (user === null) {
      throw new Error(MessageType.UNREGISTERED)
    }

    const chatOwnerUser = await User.findBy('twitchID', channelId)
    if (chatOwnerUser === null) {
      // If this is hit, chat owner might've deleted their user. TODO: HANDLE
      Logger.error(`Tried to find an unknown chat owner user. channelId: ${channelId}`)
      // Ignore request.
      throw new Error()
    }

    let profile = await user.related('profile').query().where('chatUserId', chatOwnerUser.id).first()

    if (profile === null) {
      // Register this profile for the user & continue.
      profile = await user.related('profile').create({
        chatUserId: chatOwnerUser.id,
      })
    }

    return { user, chatOwnerUser, profile }
  }

  // https://stackoverflow.com/a/12646864
  private durstenfeldShuffle (array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
  }
}

/**
 * This makes our service a singleton
 */
export default new Match()

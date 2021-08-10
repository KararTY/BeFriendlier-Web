import Logger from '@ioc:Adonis/Core/Logger'
import Database from '@ioc:Adonis/Lucid/Database'
import Profile from 'App/Models/Profile'
import User from 'App/Models/User'
import {
  BASE,
  BIO,
  Emote,
  EMOTES,
  GIVEEMOTES,
  MessageType,
  NameAndId,
  REGISTER,
  ROLLMATCH,
  TwitchGlobalEmotes,
  UNMATCH
} from 'befriendlier-shared'
import { DateTime } from 'luxon'
import TwitchConfig from '../../config/twitch'
import WebSocketServer, { ExtendedWebSocket } from './Ws'

class Handler {
  /**
   * MAKE SURE TO CATCH ERRORS.
   */
  public async rollMatch ({ userTwitch, channelTwitch, global }: ROLLMATCH, fpoc?: { chatOwnerUser: User, profile: Profile }): Promise<{ user: User, profile: Profile}> {
    let chatOwnerUser: User
    let profile: Profile

    if (!fpoc) {
      fpoc = await this.findProfileOrCreateByChatOwner(userTwitch, channelTwitch, global)
    }

    chatOwnerUser = fpoc.chatOwnerUser
    profile = fpoc.profile

    if (profile.rolls.length > 0) {
      // Return match
      const rau = await this.rollUntilAvailableUser(profile.rolls)

      if (rau instanceof Error) {
        throw this.error(MessageType.ERROR, userTwitch, channelTwitch,
          'looks like it\'s not your lucky day today, rubber ducky 🦆 Try rolling a match again in a bit.')
      }

      const {
        rolls,
        user: matchUser,
        profile: matchProfile,
      } = rau

      // We don't need to save the array if it's not been edited.
      if (rolls instanceof Array && rolls.length !== profile.rolls.length) {
        profile.rolls = rolls as number[]
        await profile.save()
      }

      return { user: matchUser as User, profile: matchProfile as Profile }
    }

    if (profile.nextRolls.diffNow('hours').hours >= 0) {
      throw this.error(MessageType.ERROR, userTwitch, channelTwitch, `you are on a cooldown. Please try again ${String(profile.nextRolls.toRelative())}.`)
    }

    await profile.load('matches')

    /**
     * Find matches in the same chat,
     * filter away deleted users,
     * filter away own profile, mismatches and current matches.
     */
    const profiles = await Profile.query()
      .where('chatUserId', chatOwnerUser.id)
      .where('enabled', true)
      .whereNotIn('id', [
        profile.id,
        ...profile.mismatches,
        ...profile.matches.map(match => match.id),
      ])

    // Ratelimit user's rolls to every 5 hours.
    profile.nextRolls = DateTime.fromJSDate(new Date()).plus({ hours: 5 })

    // TODO: Double check implementation.
    let filteredProfiles: Array<Profile | null> = [...profiles]
    for (let index = 0; index < filteredProfiles.length; index++) {
      const profile = filteredProfiles[index]
      if (profile === null) continue

      const user = await this.findUserByProfile(profile)
      await user.load('favoriteStreamers')

      // Don't roll this user if profile hasn't been customized yet.
      if (user.favoriteStreamers.length === 0 && profile.bio === 'Hello!' && profile.favoriteEmotes.length === 0) {
        filteredProfiles[index] = null
      }
    }

    if (filteredProfiles.length === 0) {
      profile.rolls = []
      await profile.save()
      throw this.error(MessageType.TAKEABREAK, userTwitch, channelTwitch,
        `looks like you're not lucky today, rubber ducky 🦆 Try rolling a match again ${String(profile.nextRolls.toRelative())}.`)
    }

    // Shuffle the array!
    this.durstenfeldShuffle(filteredProfiles)

    profile.rolls = filteredProfiles.filter(p => p !== null).map((profile: Profile) => profile.id).slice(0, 10)

    await profile.save()

    const matchedUser = await this.findUserByProfile(profiles[0])

    return { user: matchedUser, profile: profiles[0] }
  }

  /**
   * MAKE SURE TO CATCH ERRORS.
   */
  public async match ({ userTwitch, channelTwitch, global }: BASE): Promise<{ attempt: MessageType, user?: User, matchUser?: User }> {
    const { user, profile } = await this.findProfileOrCreateByChatOwner(userTwitch, channelTwitch, global)

    const profileId = profile.rolls.shift()

    const matchProfile = await Profile.find(profileId)

    if (matchProfile === null) {
      // Shouldn't hit here, maybe user deleted as soon as they tried to match.
      Logger.error(`Tried to match with an unknown profile. profileId: ${String(profileId)}`)
      throw this.error(MessageType.ERROR, userTwitch, channelTwitch, 'user does not exist.')
    }

    // Add match for this profile.
    await profile.related('matches').attach({
      [matchProfile.id]: {
        user_id: profile.userId,
        match_user_id: matchProfile.userId,
        created_at: DateTime.fromJSDate(new Date()),
        updated_at: DateTime.fromJSDate(new Date()),
      },
    })

    // Check if matched profile also has this user as a match, if so, announce match to both users.
    const hasMatched = await Database.query().from('matches_lists').where({
      profile_id: matchProfile.id,
      match_user_id: user.id,
    }).first()

    const matchUser = await this.findUserByProfile(matchProfile)

    if (matchUser === null) {
      // Shouldn't hit here, maybe user deleted as soon as they tried to match.
      Logger.error(`Tried to match with an unknown user. userId:${matchProfile.userId}, profileId: ${String(profileId)}`)
      throw this.error(MessageType.ERROR, userTwitch, channelTwitch, 'user does not exist.')
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
  public async unmatch ({ userTwitch, matchUserTwitch, channelTwitch }: UNMATCH): Promise<boolean> {
    const { profile, chatOwnerUser } = await this.findProfileOrCreateByChatOwner(userTwitch, channelTwitch)

    const matchUser = await User.findBy('name', matchUserTwitch.name)

    if (matchUser === null) {
      // Shouldn't hit here, maybe user deleted as soon as they tried to unmatch or they simply do not exist.
      Logger.error(`Tried to unmatch with an unknown user. matchUserTwitch.name:${String(matchUserTwitch.name)}, profile.id: ${String(profile.id)}`)
      throw this.error(MessageType.ERROR, userTwitch, channelTwitch, 'user does not exist.')
    }

    const matchProfile = await matchUser.related('profile').query().where('chatUserId', chatOwnerUser.id).first()

    if (matchProfile === null) {
      /**
       * Shouldn't hit here, maybe user deleted their profile
       * as soon as they tried to unmatch or it simply does not exist.
       */
      Logger.error(`Tried to unmatch with an unknown profile. matchUserTwitch.name:${String(matchUserTwitch.name)}, profile.id: ${String(profile.id)}`)
      throw this.error(MessageType.ERROR, userTwitch, channelTwitch, 'user does not exist.')
    }

    const match = await profile.related('matches').query().where('id', matchProfile.id).first()

    if (match === null) {
      return false
    }

    profile.mismatches.push(matchProfile.id)

    await profile.save()

    await profile.related('matches').detach([matchProfile.id])

    return true
  }

  /**
   * MAKE SURE TO CATCH ERRORS.
   */
  public async mismatch ({ userTwitch, channelTwitch, global }: BASE): Promise<void> {
    const { profile } = await this.findProfileOrCreateByChatOwner(userTwitch, channelTwitch, global)

    const profileId = profile.rolls.shift()

    if (profileId === undefined) {
      Logger.error(`Could not find rolls to mismatch. userTwitch.id:${String(userTwitch.id)}, profile.id: ${String(profile.id)}`)
      throw this.error(
        MessageType.ERROR, userTwitch, channelTwitch, 'looks like you\'re not currently matching with anyone.')
    }

    profile.mismatches.push(profileId)

    await profile.save()
  }

  /**
   * MAKE SURE TO CATCH ERRORS.
   */
  public async setEmotes ({ userTwitch, channelTwitch, emotes, global }: EMOTES): Promise<void> {
    const { profile } = await this.findProfileOrCreateByChatOwner(userTwitch, channelTwitch, global)

    profile.favoriteEmotes = emotes

    await profile.save()
  }

  /**
   * MAKE SURE TO CATCH ERRORS.
   */
  public async getEmotes ({ userTwitch, channelTwitch, global }: EMOTES): Promise<Emote[]> {
    const { profile } = await this.findProfileOrCreateByChatOwner(userTwitch, channelTwitch, global)

    return profile.favoriteEmotes || []
  }

  /**
   * MAKE SURE TO CATCH ERRORS.
   */
  public async setBio ({ userTwitch, channelTwitch, bio, global }: BIO): Promise<string> {
    const { profile } = await this.findProfileOrCreateByChatOwner(userTwitch, channelTwitch, global)

    profile.bio = bio

    await profile.save()

    return profile.bio
  }

  /**
   * MAKE SURE TO CATCH ERRORS.
   */
  public async getBio ({ userTwitch, channelTwitch, global }: BIO): Promise<string> {
    const { profile } = await this.findProfileOrCreateByChatOwner(userTwitch, channelTwitch, global)

    return profile.bio
  }

  // Deals with global profiles only.
  public async giveEmotes ({ userTwitch, channelTwitch, recipientUserTwitch, emotes }: GIVEEMOTES): Promise<Emote[]> {
    const { user } = await this.findProfileOrCreateByChatOwner(userTwitch, channelTwitch, true)

    // Check if they have emotes
    const nonExistentEmotes: string[] = []
    for (let index = 0; index < emotes.length; index++) {
      const emote = emotes[index]
      const existingEmote = user.emotes.find(ee => ee.id === emote.id)

      // Does user have emote?
      if (existingEmote === undefined) {
        nonExistentEmotes.push(emote.name)
        continue
      }

      // Change requested values to what currently exists.
      if ((existingEmote.amount as number) < (emote.amount as number)) {
        emote.amount = existingEmote.amount
      }

      // You've got 0 of this emote, therefore it is nonexistent.
      if ((emote.amount as number) === 0) {
        nonExistentEmotes.push(emote.name)
      }
    }

    if (nonExistentEmotes.length > 0) {
      throw this.error(MessageType.ERROR, userTwitch, channelTwitch, `you don't have the following emotes: ${nonExistentEmotes.join(' ')}`)
    }

    // Check if recipient exists in case the client bot doesn't check for some reason.
    const recipientUserModel = await this.findUserByTwitchID(recipientUserTwitch.id)
    if (recipientUserModel === null) {
      throw this.error(MessageType.ERROR, userTwitch, channelTwitch, "the user you're attempting to give emotes to is not registered.")
    }

    // In case the client bot doesn't check for some reason.
    if (recipientUserModel.id === user.id) {
      throw this.error(MessageType.ERROR, userTwitch, channelTwitch, "No I don't think so, you're attempting to trade with yourself.")
    }

    // Recipient user isn't registered.
    if (recipientUserModel.createdAt.year === 1970) {
      throw this.error(MessageType.ERROR, userTwitch, channelTwitch, "you can't send to that user.")
    }

    for (let index = 0; index < emotes.length; index++) {
      const emote = emotes[index]
      const existingUserEmoteIndex = user.emotes.findIndex(ee => ee.id === emote.id)
      const existingUserEmote = user.emotes[existingUserEmoteIndex]

      // Remove this user's emotes
      ;(existingUserEmote.amount as number) -= emote.amount as number

      if (existingUserEmote.amount === 0) {
        // Remove the entry completely.
        user.emotes.splice(existingUserEmoteIndex, 1)
      }

      // Add emotes to recipient user
      const existingRecipientUserEmote = recipientUserModel.emotes.find(ee => ee.id === emote.id)

      if (existingRecipientUserEmote === undefined) {
        recipientUserModel.emotes.push(emote)
      } else {
        (existingRecipientUserEmote.amount as number) += emote.amount as number
      }
    }

    // Save both
    await Promise.all([user.save(), recipientUserModel.save()])

    return emotes
  }

  public async rollEmote(
    { userTwitch, channelTwitch, global }: BASE,
    { socket, emotes, ws }: { socket: ExtendedWebSocket, emotes: TwitchGlobalEmotes[], ws: typeof WebSocketServer }): Promise<Emote | null> {
    // Get Twitch's global emotes.
    const { user, profile } = await this.findProfileOrCreateByChatOwner(userTwitch, channelTwitch, global)

    if (!(user && emotes)) {
      return null
    }

    if (profile.nextEmote.diffNow('hours').hours >= 0) {
      return null
    }

    this.durstenfeldShuffle(emotes)

    const emote = emotes[0]

    const existingUserEmoteIndex = user.emotes.findIndex(ee => ee.id === emote.id)

    if (existingUserEmoteIndex > -1) {
      (user.emotes[existingUserEmoteIndex].amount as number) += 1
    } else {
      user.emotes.push({ id: emote.id, name: emote.name, amount: 1 })
    }

    // Ratelimit user's emotes to every 5 hours.
    profile.nextEmote = DateTime.fromJSDate(new Date()).plus({ hours: 5 })

    await user.save()
    await profile.save()

    socket.send(ws.socketMessage(
      MessageType.WHISPER,
      JSON.stringify({
        channelTwitch, userTwitch, result: {
          value: `rubber ducky 🦆 here, you've received an emote: ${emote.name} (On ${global ? 'GLOBAL' : channelTwitch.name})`
            + ' You can check your emote inventory at the website.'
        }
      })
    ))

    return {
      id: emote.id,
      name: emote.name
    }
  }

  public async register ({ userTwitch }: REGISTER): Promise<Boolean> {
    const userExists = await User.findBy('twitchID', userTwitch.id)

    if (userExists === null) {
      // Register account
      const user = await User.create({
        twitchID: userTwitch.id,
        name: userTwitch.name,
        displayName: userTwitch.displayName,
        avatar: userTwitch.avatar,
      })

      // Create default global profile, but not enabled.
      await user.related('profile').create({
        enabled: false,
        chatUserId: 0,
      })

      await user.save()

      return true
    }

    else return false
  }

  public async findAllHostedChannels (): Promise<User[]> {
    return await User.query().where({ host: true })
  }

  public async findUserByTwitchID (twitchID: string): Promise<User | null> {
    return await User.findBy('twitchID', twitchID)
  }

  private async findUserByProfile (profile: Profile): Promise<User> {
    const user = await User.find(profile.userId)

    if (user === null) {
      // Shouldn't hit this at all.
      Logger.error(`Tried to find a profile's user. profile.id: ${profile.id}, profile.userId: ${profile.userId}`)
      // Ignore request.
      throw new Error()
    }

    return user
  }

  public async findProfileOrCreateByChatOwner (user: User | NameAndId, channel: User | NameAndId, global = false):
  Promise<{ user: User, chatOwnerUser: User, profile: Profile }> {
    const userModel = user instanceof User ? user : await User.findBy('twitchID', user.id)
    const chatOwnerUserModel = channel instanceof User ? channel
      : await User.findBy('twitchID', global ? TwitchConfig.user.id : channel.id)

    let profileModel: Profile | null

    if (userModel === null) {
      throw this.error(MessageType.UNREGISTERED, user, channel)
    }

    if (chatOwnerUserModel === null) {
      // If this is hit, chat owner might've deleted their user. TODO: HANDLE
      Logger.error(`Tried to find an unknown chat owner user. channelId: ${channel instanceof User ? String(channel.id) : String(channel.name)}`)
      // Ignore request.
      throw new Error()
    }

    profileModel = await userModel.related('profile').query().where('chatUserId', chatOwnerUserModel.id).first()

    if (profileModel === null) {
      // Register this profile for the user & continue.
      profileModel = await userModel.related('profile').create({
        bio: 'Hello!',
        favoriteEmotes: [],
        chatUserId: chatOwnerUserModel.id,
        rolls: [],
        mismatches: [],
        nextRolls: DateTime.fromJSDate(new Date()),
      })
    } else {
      if (!profileModel.enabled) {
        throw this.error(MessageType.ERROR, user, channel, `this profile is disabled.${global ? ' The global profile has to be enabled via the BeFriendlier website.' : ''}`)
      }
    }

    return { user: userModel, chatOwnerUser: chatOwnerUserModel, profile: profileModel }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  private async rollUntilAvailableUser (rolls: number[]) {
    if (rolls.length === 0) {
      return new Error()
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

  private error (type: MessageType, user: User | NameAndId, channel: User | NameAndId, message?: string): Error {
    const error = new Error(type) as any

    error.data = {}

    if (user instanceof User) {
      error.data.userTwitch = { id: user.twitchID, name: user.name }
    } else {
      error.data.userTwitch = { id: user.id, name: user.name }
    }

    if (channel instanceof User) {
      error.data.channelTwitch = { id: channel.twitchID, name: channel.name }
    } else {
      error.data.channelTwitch = { id: channel.id, name: channel.name }
    }

    if (message !== undefined) {
      error.data.result = { value: message }
    }

    return error as Error
  }

  // https://stackoverflow.com/a/12646864 CC BY-SA 4.0
  // Mutates the array.
  private durstenfeldShuffle (array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
  }
}

/**
 * This makes our service a singleton
 */
export default new Handler()

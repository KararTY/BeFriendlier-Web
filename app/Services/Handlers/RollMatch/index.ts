import Emote from 'App/Models/Emote'
import Profile from 'App/Models/Profile'
import User from 'App/Models/User'
import { MessageType, ROLLMATCH } from 'befriendlier-shared'
import { ExtendedWebSocket, ResSchema } from '../../Ws'
import BattleHandler from '../Battle'
import DefaultHandler from '../DefaultHandler'
import Helper from '../Helpers'

export default class RollMatchHandler extends DefaultHandler {
  public messageType = MessageType.ROLLMATCH

  public async onClientResponse (socket: ExtendedWebSocket, res: ResSchema): Promise<void> {
    // TODO: Should we raise an error?
    if (res.data === undefined) return

    const rm: ROLLMATCH = JSON.parse(res.data)

    const globalStr = rm.global === true ? 'global ' : ''

    const { profile: thisProfile, chatOwnerUser: thisChatOwnerUser, user } = await Helper.findProfileOrCreateByChatOwner(rm.userTwitch, rm.channelTwitch, rm.global)

    const messages: Array<{ long: string, short: string }> = []
    if (thisProfile.bio.length < 3) {
      messages.push(
        {
          long: `Your profile is not customized! Set it using "%prefix%profile ${globalStr}<bio & Twitch emotes go here>".`,
          short: 'profile is not customized'
        }
      )
    }

    if (messages.length > 0) {
      socket.send(this.ws.socketMessage(MessageType.WHISPER, JSON.stringify({
        ...rm,
        result: {
          value: messages.map(m => m.long).join(' ') + ' Use %prefix%help profile for more information.'
        }
      })))

      rm.result = {
        value: `your ${messages.map(m => m.short).join(', ')}.`
      }

      socket.send(this.ws.socketMessage(MessageType.ERROR, JSON.stringify(rm)))
      return
    }

    let profile: Profile
    let rollMatchUser: User
    try {
      const data = await Helper.rollMatch(rm,
        { profile: thisProfile, chatOwnerUser: thisChatOwnerUser },
        { socket, ws: this.ws }
      )

      profile = data.profile
      rollMatchUser = data.user
    } catch (error) {
      if (error.message === MessageType.TAKEABREAK) {
        await BattleHandler.resetUserBattleEmotes(user)
      }

      throw error
    }

    await rollMatchUser.load('favoriteStreamers')
    const favoriteStreamers = rollMatchUser.favoriteStreamers.map(user => { return { name: user.name } })

    const profileFavoriteEmotes = await Emote.findMany(profile.favoriteEmotes)

    rm.result = {
      value: {
        profile: { bio: profile.bio, favorite_emotes: profileFavoriteEmotes.map(e => e.serialize()) },
        user: { favorite_streamers: favoriteStreamers }
      }
    }

    socket.send(this.ws.socketMessage(MessageType.ROLLMATCH, JSON.stringify(rm)))
  }
}

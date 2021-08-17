import { ExtendedWebSocket, ResSchema } from '../Ws'
import DefaultHandler from './DefaultHandler'
import { MessageType, ROLLMATCH } from 'befriendlier-shared'
import Handler from '../Handler'

export default class RollMatchHandler extends DefaultHandler {
  public messageType = MessageType.ROLLMATCH

  public async onClientResponse(socket: ExtendedWebSocket, res: ResSchema): Promise<void> {
    if (res.data === undefined) return

    const rm: ROLLMATCH = JSON.parse(res.data)

    const globalStr = rm.global === true ? 'global ' : ''

    const { profile: thisProfile, chatOwnerUser: thisChatOwnerUser } = await Handler.findProfileOrCreateByChatOwner(rm.userTwitch, rm.channelTwitch, rm.global)

    let messages: { long: string, short: string }[] = []
    if (thisProfile.bio === 'Hello!' || thisProfile.bio.length < 3) {
      messages.push(
        { long: `Your bio is not customized! Set it using "%prefix%bio ${globalStr}<bio goes here>".`,
        short: 'bio is not customized' }
      )
    }

    if (thisProfile.favoriteEmotes.length === 0) {
      messages.push(
        { long: `You haven't defined any favorite emotes! Set some using "%prefix%emotes ${globalStr}<twitch emotes go here>".`,
        short: 'favorite emotes not set'}
      )
    }

    if (messages.length > 0) {
      socket.send(this.ws.socketMessage(MessageType.WHISPER, JSON.stringify({
        ...rm, result: {
        value: messages.map(m => m.long).join(' ') + ' Use %prefix%help bio, %prefix%help emotes for more information.'
        }
      })))

      rm.result = {
        value: `you\'ve not customized your profile! Your ${messages.map(m => m.short).join(', ')}.`
      }

      socket.send(this.ws.socketMessage(MessageType.ERROR, JSON.stringify(rm)))
      return
    }

    const { user, profile } = await Handler.rollMatch(rm,
      { profile: thisProfile, chatOwnerUser: thisChatOwnerUser },
      { socket, ws: this.ws },
    )

    await user.load('favoriteStreamers')
    const favoriteStreamers = user.favoriteStreamers.map(user => user.serialize({ fields: ['name'] }))

    rm.result = {
      value: {
        profile: profile.serialize({ fields: ['bio', 'favorite_emotes'] }),
        user: { favorite_streamers: favoriteStreamers }
      }
    }

    socket.send(this.ws.socketMessage(MessageType.ROLLMATCH, JSON.stringify(rm)))
  }
}

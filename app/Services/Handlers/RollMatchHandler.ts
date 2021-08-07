import { ExtendedWebSocket, ResSchema } from '../Ws'
import DefaultHandler from './DefaultHandler'
import { MessageType, More, ROLLMATCH } from 'befriendlier-shared'
import Handler from '../Handler'

export default class RollMatchHandler extends DefaultHandler {
  public messageType = MessageType.ROLLMATCH

  public async onClientResponse(socket: ExtendedWebSocket, res: ResSchema): Promise<void> {
    if (res.data === undefined) return

    const rm: ROLLMATCH = JSON.parse(res.data)
    const { user, profile } = await Handler.rollMatch(rm)

    const noPingsStr = (str: string) => str.substr(0, 1) + '\u{E0000}' + str.substr(1)

    const bio = profile.bio.split(' ').map(word => noPingsStr(word)).join(' ')

    // Skip some stuff if user doesn't define anything.
    if (rm.more === More.NONE && profile.bio === 'Hello!') {
      rm.more = More.FAVORITEEMOTES
    }

    if (rm.more === More.FAVORITEEMOTES && profile.favoriteEmotes.length === 0) {
      rm.more = More.FAVORITESTREAMERS
    }

    if (rm.more === More.FAVORITESTREAMERS && user.favoriteStreamers.length === 0) {
      rm.more = More.BIO
    }

    switch (rm.more) {
      case More.NONE:
        rm.result = {
          value: `new ${rm.global === true ? 'global ' : ''}match's bio: ` +
            `${profile.bio.length > 32 ? `${bio.substr(0, 32)}...` : bio}, reply with %prefix%more, %prefix%match or %prefix%no`,
        }
        break
      case More.BIO:
        rm.result = {
          value: `${rm.global === true ? 'global\'s ' : ''}full bio: ` +
            `${bio}`,
        }
        break
      case More.FAVORITEEMOTES:
        rm.result = {
          value: `${rm.global === true ? 'global ' : ''}match's favorite emotes: ` +
            `${profile.favoriteEmotes.length > 0 ? profile.favoriteEmotes.map(emote => emote.name).join(' ') : 'None.'}`,
        }
        break
      case More.FAVORITESTREAMERS: {
        await user.preload('favoriteStreamers')

        const favoriteStreamers = user.favoriteStreamers.map(streamer => noPingsStr(streamer.name)).join(', ')

        rm.result = {
          value: `${rm.global === true ? 'global ' : ''}match's favorite streamers: ` +
            `${user.favoriteStreamers.length > 0 ? favoriteStreamers : 'None'}.`,
        }
        break
      }
    }

    socket.send(this.ws.socketMessage(MessageType.ROLLMATCH, JSON.stringify(rm)))
  }
}

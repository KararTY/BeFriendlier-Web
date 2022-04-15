import { ExtendedWebSocket, ResSchema } from 'App/Services/Ws'
import { BASE, MessageType, PROFILE } from 'befriendlier-shared'
import BioHandler from '../Bio'
import DefaultHandler from '../DefaultHandler'
import EmotesHandler from '../Emotes'

export default class ProfileHandler extends DefaultHandler {
  public messageType = MessageType.PROFILE

  public async onClientResponse (socket: ExtendedWebSocket, res: ResSchema): Promise<void> {
    // TODO: Should we raise an error?
    if (res.data === undefined) return

    const data: PROFILE = JSON.parse(res.data)

    if (data.bio.length >= 3) {
      await BioHandler.setBio(data)
      await EmotesHandler.setEmotes(data)
    }

    const bio = await BioHandler.getBio(data)
    const emotes = await EmotesHandler.getEmotes(data)

    data.result = {
      value: {
        bio,
        emotes
      }
    }

    socket.send(this.ws.socketMessage(MessageType.PROFILE, JSON.stringify(data)))
  }

  public static profileType (data: BASE): string {
    return data.global === true ? 'global profile' : 'channel profile'
  }
}

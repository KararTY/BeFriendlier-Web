import { ExtendedWebSocket, ResSchema } from '../Ws'
import DefaultHandler from './DefaultHandler'
import { BASE, MessageType } from 'befriendlier-shared'
import Handler from '../Handler'

export default class MismatchHandler extends DefaultHandler {
  public messageType = MessageType.MISMATCH

  public async onClientResponse (socket: ExtendedWebSocket, res: ResSchema) {
    if (res.data !== undefined) {
      const data: BASE = JSON.parse(res.data)

      await Handler.mismatch(data)

      const emotes = await this.ws.twitchAPI.getGlobalEmotes(this.ws.token.superSecret)
      if (emotes) {
        await Handler.rollEmote(data, { socket, ws: this.ws, emotes })
      }

      data.result = { value: 'FeelsBadMan Better luck next time!' }
      socket.send(this.ws.socketMessage(MessageType.MISMATCH, JSON.stringify(data)))
    }
  }
}

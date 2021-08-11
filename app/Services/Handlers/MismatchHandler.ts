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
      await Handler.rollEmote(data, { socket, ws: this.ws })

      data.result = { value: 'FeelsBadMan Better luck next time!' }
      socket.send(this.ws.socketMessage(MessageType.MISMATCH, JSON.stringify(data)))
    }
  }
}

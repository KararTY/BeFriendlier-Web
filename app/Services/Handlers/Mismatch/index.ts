import { BASE, MessageType } from 'befriendlier-shared'
import { ExtendedWebSocket, ResSchema } from '../../Ws'
import DefaultHandler from '../DefaultHandler'
import Helper from '../Helpers'

export default class MismatchHandler extends DefaultHandler {
  public messageType = MessageType.MISMATCH

  public async onClientResponse (socket: ExtendedWebSocket, res: ResSchema): Promise<void> {
    // TODO: Should we raise an error?
    if (res.data === undefined) return

    const data: BASE = JSON.parse(res.data)

    await Helper.mismatch(data)
    await Helper.rollEmote({ type: res.type, ...data }, { socket, ws: this.ws })

    data.result = { value: 'FeelsBadMan Better luck next time!' }
    socket.send(this.ws.socketMessage(MessageType.MISMATCH, JSON.stringify(data)))
  }
}

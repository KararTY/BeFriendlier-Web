import { MessageType, UNMATCH } from 'befriendlier-shared'
import { ExtendedWebSocket, ResSchema } from '../../Ws'
import DefaultHandler from '../DefaultHandler'
import Helper from '../Helpers'

export default class UnmatchHandler extends DefaultHandler {
  public messageType = MessageType.UNMATCH

  public async onClientResponse (socket: ExtendedWebSocket, res: ResSchema): Promise<void> {
    // TODO: Should we raise an error?
    if (res.data === undefined) return

    const data: UNMATCH = JSON.parse(res.data)
    const hasUnmatched = await Helper.unmatch(data)

    data.result = {
      value: `you have ${hasUnmatched
        ? `unmatched with ${String(data.matchUserTwitch.name)}. 🦆 Rubber ducky understands.`
        : 'unsuccessfully unmatched. In fact, you were never matched with them to begin with FeelsBadMan ...'
      }`
    }

    socket.send(this.ws.socketMessage(MessageType.UNMATCH, JSON.stringify(data)))
  }
}

import { ExtendedWebSocket, ResSchema } from '../Ws'
import DefaultHandler from './DefaultHandler'
import { GIVEEMOTES, MessageType } from 'befriendlier-shared'
import Handler from '../Handler'

export default class GiveEmotesHandler extends DefaultHandler {
  public messageType = MessageType.GIVEEMOTES

  public async onClientResponse (socket: ExtendedWebSocket, res: ResSchema): Promise<void> {
    if (res.data === undefined) return
    const data: GIVEEMOTES = JSON.parse(res.data)

    const sentEmotes = await Handler.giveEmotes(data)

    data.emotes = sentEmotes

    data.result = {
      value: `you gave: ${data.emotes.map(e => `${(e.amount || 1) > 1 ? `x${e.amount} ` : ''}${e.name}`).join(' ')}` +
        ` to ${data.recipientUserTwitch.name}!`,
    }

    socket.send(this.ws.socketMessage(MessageType.GIVEEMOTES, JSON.stringify(data)))
  }
}

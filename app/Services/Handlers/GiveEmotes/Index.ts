import { Emote, GIVEEMOTES, MessageType } from 'befriendlier-shared'
import { ExtendedWebSocket, ResSchema } from '../../Ws'
import DefaultHandler from '../DefaultHandler'
import EmotesHandler from '../Emotes'

export default class GiveEmotesHandler extends DefaultHandler {
  public messageType = MessageType.GIVEEMOTES

  public async onClientResponse (socket: ExtendedWebSocket, res: ResSchema): Promise<void> {
    // TODO: Should we raise an error?
    if (res.data === undefined) return

    const data: GIVEEMOTES = JSON.parse(res.data)

    const sentEmotes = await EmotesHandler.giveEmotes(data)

    data.emotes = sentEmotes

    const amount = (e: Emote): number => typeof e.amount === 'number' ? e.amount : 1 as number

    data.result = {
      value: `you gave: ${data.emotes.map(e => {
        const amnt = amount(e)
        return `${amnt > 1 ? `x${amnt} ` : ''}${e.name}`
      }).join(' ')
        }` + ` to ${data.recipientUserTwitch.name}!`
    }

    socket.send(this.ws.socketMessage(MessageType.GIVEEMOTES, JSON.stringify(data)))
  }
}

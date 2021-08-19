import { ExtendedWebSocket, ResSchema } from '../Ws'
import DefaultHandler from './DefaultHandler'
import { EMOTES, MessageType } from 'befriendlier-shared'
import Handler from '../Handler'

export default class EmotesHandler extends DefaultHandler {
  public messageType = MessageType.EMOTES

  public async onClientResponse (socket: ExtendedWebSocket, res: ResSchema) {
    if (res.data !== undefined) {
      const data: EMOTES = JSON.parse(res.data)

      if (data.emotes.length > 0) {
        await Handler.setEmotes(data)

        data.result = { value: `Successfully set following ${data.global === true ? 'global' : 'channel'} profile emotes: ${String(data.emotes.map(emote => emote.name).join(' '))}` }
      } else {
        const emotes = await Handler.getEmotes(data)

        data.result = {
          value: `your ${data.global === true ? 'global' : 'channel'} profile emotes: ${emotes.length > 0 ? emotes.map(emote => emote.name).join(' ') : 'None.'}`
        }

        socket.send(this.ws.socketMessage(MessageType.WHISPER, JSON.stringify({
          ...data, result: {
            value: 'Your emote collection inventory is available at the website.'
          }
        })))
      }

      socket.send(this.ws.socketMessage(MessageType.EMOTES, JSON.stringify(data)))
    }
  }
}

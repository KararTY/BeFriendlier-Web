import { BASE, MessageType } from 'befriendlier-shared'
import { ExtendedWebSocket, ResSchema } from '../../Ws'
import DefaultHandler from '../DefaultHandler'
import Helper from '../Helpers'

export default class MatchHandler extends DefaultHandler {
  public messageType = MessageType.MATCH

  public async onClientResponse (socket: ExtendedWebSocket, res: ResSchema): Promise<void> {
    // TODO: Should we raise an error?
    if (res.data === undefined) return

    const data: BASE = JSON.parse(res.data)
    const result = await Helper.match(data)

    await Helper.rollEmote({ type: res.type, ...data }, { socket, ws: this.ws })

    switch (result.attempt) {
      case MessageType.MATCH: {
        // Attempted to match. Must wait for receiving end.
        data.result = {
          value: `you are attempting to match with a ${data.global === true ? 'global ' : ''}user. 🤞`
        }
        socket.send(this.ws.socketMessage(MessageType.WHISPER, JSON.stringify({
          ...data,
          result: {
            originalType: res.type,
            value: 'Good luck! You will receive a notification on a successful match!'
          }
        })))
        socket.send(this.ws.socketMessage(MessageType.MATCH, JSON.stringify(data)))
        break
      }
      case MessageType.SUCCESS: {
        if (result.matchUser !== undefined) {
          // Successfully matched!
          data.result = {
            matchUsername: result.matchUser.name,
            value: 'you have matched with %s%! Send them a message?'
          }
          socket.send(this.ws.socketMessage(MessageType.SUCCESS, JSON.stringify(data)))
        }
        break
      }
    }
  }
}

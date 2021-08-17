import { ExtendedWebSocket, ResSchema } from '../Ws'
import DefaultHandler from './DefaultHandler'
import { BIO, MessageType } from 'befriendlier-shared'
import Handler from '../Handler'

export default class BioHandler extends DefaultHandler {
  public messageType = MessageType.BIO

  public async onClientResponse (socket: ExtendedWebSocket, res: ResSchema) {
    if (res.data !== undefined) {
      const data: BIO = JSON.parse(res.data)

      if (data.bio.length > 0) {
        const bioRes = await Handler.setBio(data)

        socket.send(this.ws.socketMessage(MessageType.WHISPER, JSON.stringify({
          ...data, result: {
            value: `Here's a part of it: ${bioRes.length > 32 ? `${bioRes.substr(0, 32)}...` : bioRes}`
          }
        })))

        data.result = { value: `Successfully set your ${data.global === true ? 'global' : 'profile'} bio.` }
      } else {
        const bioRes = await Handler.getBio(data)

        data.result = { value: bioRes }
      }

      socket.send(this.ws.socketMessage(MessageType.BIO, JSON.stringify(data)))
    }
  }
}

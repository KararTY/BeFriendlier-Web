import { ExtendedWebSocket, ResSchema } from '../Ws'
import DefaultHandler from './DefaultHandler'
import { MessageType, REGISTER } from 'befriendlier-shared'
import Handler from '../Handler'

export default class RegisterHandler extends DefaultHandler {
  public messageType = MessageType.REGISTER

  public async onClientResponse (socket: ExtendedWebSocket, res: ResSchema) {
    if (res.data !== undefined) {
      const data: REGISTER = JSON.parse(res.data)

      const registrationSuccess = await Handler.register(data)

      data.result = {
        value: registrationSuccess
      }
      socket.send(this.ws.socketMessage(MessageType.REGISTER, JSON.stringify(data)))
    }
  }
}

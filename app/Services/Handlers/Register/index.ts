import { MessageType, REGISTER } from 'befriendlier-shared'
import { ExtendedWebSocket, ResSchema } from '../../Ws'
import DefaultHandler from '../DefaultHandler'
import Helper from '../Helpers'

export default class RegisterHandler extends DefaultHandler {
  public messageType = MessageType.REGISTER

  public async onClientResponse (socket: ExtendedWebSocket, res: ResSchema): Promise<void> {
    // TODO: Should we raise an error?
    if (res.data === undefined) return

    const data: REGISTER = JSON.parse(res.data)

    const registrationSuccess = await Helper.register(data, { socket, ws: this.ws })

    if ((typeof registrationSuccess !== 'boolean') && registrationSuccess === null) {
      return
    }

    data.result = {
      value: registrationSuccess
    }
    socket.send(this.ws.socketMessage(MessageType.REGISTER, JSON.stringify(data)))
  }
}

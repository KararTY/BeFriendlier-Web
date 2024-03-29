import User from 'App/Models/User'
import { MessageType } from 'befriendlier-shared'
import { ExtendedLEAVECHAT, ExtendedWebSocket, ResSchema } from '../../Ws'
import DefaultHandler from '../DefaultHandler'
import Helper from '../Helpers'

export default class LeaveChatHandler extends DefaultHandler {
  public messageType = MessageType.LEAVECHAT

  public async onClientResponse (socket: ExtendedWebSocket, res: ResSchema): Promise<void> {
    // TODO: Should we raise an error?
    if (res.data === undefined) return

    const data: ExtendedLEAVECHAT = JSON.parse(res.data)
    let user: User | null

    user = await Helper.findUserByTwitchID(data.leaveUserTwitch.id)

    // Try again.
    if (user === null) user = await User.findBy('name', data.leaveUserTwitch.name)

    if (user === null) {
      data.result = {
        value: 'user does not exist in the database. ' +
        'Can only remove favorited or otherwise registered users.'
      }
      socket.send(this.ws.socketMessage(MessageType.ERROR, JSON.stringify(data)))
      return
    }

    user.host = false
    await user.save()

    // When the bot gets banned, the userTwitch's variables are empty.
    if (data.userTwitch.name.length > 0 && data.userTwitch.id.length > 0) {
      data.result = {
        value: `leaving ${data.leaveUserTwitch.name}...`
      }

      socket.send(this.ws.socketMessage(MessageType.SUCCESS, JSON.stringify(data)))
    }

    data.socketId = socket.id

    this.ws.request(data, this.ws.removeHost)
  }
}

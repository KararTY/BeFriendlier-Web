import Env from '@ioc:Adonis/Core/Env'
import Profile from 'App/Models/Profile'
import User from 'App/Models/User'
import { ExtendedWebSocket, ResSchema } from 'App/Services/Ws'
import { BASE, MessageType } from 'befriendlier-shared'
import DefaultHandler from '../DefaultHandler'

export default class ProfilesHandler extends DefaultHandler {
  public messageType = MessageType.PROFILES

  public async onClientResponse (socket: ExtendedWebSocket, res: ResSchema): Promise<void> {
    // TODO: Should we raise an error?
    if (res.data === undefined) return

    const data: BASE = JSON.parse(res.data)

    const userTwitchId = (data.global == null || !data.global) ? data.channelTwitch.id : Env.get('TWITCH_BOT_ID')
    const channelUser = await User.query().where('host', true).where('twitch_id', userTwitchId).first()

    if (channelUser == null) {
      data.result = {
        value: false
      }

      socket.send(this.ws.socketMessage(MessageType.PROFILES, JSON.stringify(data)))
      return
    }

    const profilesCount = await Profile.query().where('chatUserId', channelUser.id).count('*').first()

    if (profilesCount == null) {
      data.result = {
        value: 'could not find any data.'
      }

      socket.send(this.ws.socketMessage(MessageType.ERROR, JSON.stringify(data)))
    }

    data.result = {
      value: {
        count: profilesCount?.$extras.count,
        channelName: channelUser.displayName
      }
    }

    socket.send(this.ws.socketMessage(MessageType.PROFILES, JSON.stringify(data)))
  }
}

import WS from 'ws'
import { IncomingMessage } from 'http'
import { Socket } from 'net'
import bourne from '@hapi/bourne'

import Server from '@ioc:Adonis/Core/Server'
import { schema, validator } from '@ioc:Adonis/Core/Validator'
import Logger from '@ioc:Adonis/Core/Logger'

import Matching from './Match'
import { More, SocketMessage, ROLLMATCH, UNMATCH, BASE } from 'befriendlier-shared'

interface Websocket extends WS {
  isAlive: boolean
  connection: Socket
}

class Ws {
  public isReady = false
  public server: WS.Server

  public start (callback: (socket: Websocket, request: IncomingMessage) => void) {
    this.server = new WS.Server({ server: Server.instance })
    this.server.on('connection', callback)
    this.isReady = true

    this.server.on('close', () => {
      clearInterval(this.interval)
    })
  }

  // Is called from "start/socket.ts" file.
  public onMessage (socket: Websocket, msg: WS.Data) {
    switch (msg) {
      case '10':
        // Message is a PONG response, keep this socket alive.
        this.heartbeat(socket)
        break
      default:
        this.handleMessage(socket, msg)
        break
    }
  }

  private handleMessage (socket: Websocket, msg: WS.Data) {
    const json = bourne.parse(msg, null, { protoAction: 'remove' })

    validator.validate({
      schema: this.validationSchema,
      data: json,
      messages: {
        type: 'Invalid type.',
      },
      cacheKey: 'websocket',
    }).then(async res => {
      switch (res.type) {
        case SocketMessage.ROLLMATCH: {
          if (res.data !== undefined) {
            const rm: ROLLMATCH = JSON.parse(res.data)
            const result = await Matching.rollMatch(rm)
            switch (rm.more) {
              case More.NONE:
                rm.result = { value: `New match's bio: ${result.profile.bio.length > 64 ? `${result.profile.bio.substr(0, 32)}...` : result.profile.bio}, reply with !more, !match or !no` }
                socket.send(this.socketMessage(SocketMessage.ROLLMATCH, JSON.stringify(rm)))
                break
              case More.BIO:
                rm.result = { value: `Full bio: ${result.profile.bio}.` }
                socket.send(this.socketMessage(SocketMessage.ROLLMATCH, JSON.stringify(rm)))
                break
              case More.FAVORITEEMOTES:
                rm.result = { value: `Match's favorite emotes: ${result.profile.favoriteEmotes.length > 0 ? result.profile.favoriteEmotes.map(emote => emote.name).join(' ') : 'None.'}` }
                socket.send(this.socketMessage(SocketMessage.ROLLMATCH, JSON.stringify(rm)))
                break
              case More.FAVORITESTREAMERS:
                rm.result = { value: `Match's favorite streamers: ${result.user.favoriteStreamers.length > 0 ? result.user.favoriteStreamers.map(streamer => streamer.name).join(', ') : 'None'}.` }
                socket.send(this.socketMessage(SocketMessage.ROLLMATCH, JSON.stringify(rm)))
                break
            }
          }
          break
        }
        case SocketMessage.MATCH: {
          if (res.data !== undefined) {
            const rm: BASE = JSON.parse(res.data)
            const result = await Matching.match(rm)
            switch (result.attempt) {
              case SocketMessage.MATCH: {
                // Attempted to match. Must wait for receiving end.
                rm.result = {
                  value: 'You are attempting to match with a new user. Good luck!' +
                    // eslint-disable-next-line comma-dangle
                    'You will receive a notification on a successful match!'
                }
                socket.send(this.socketMessage(SocketMessage.MATCH, JSON.stringify(rm)))
                break
              }
              case SocketMessage.SUCCESS: {
                if (result.matchUser !== undefined) {
                  // Successfully matched!
                  rm.result = {
                    matchUsername: result.matchUser.name,
                    value: 'You have matched with %s! Send them a message?',
                  }
                  socket.send(this.socketMessage(SocketMessage.SUCCESS, JSON.stringify(rm)))
                }
                break
              }
            }
          }
          break
        }
        case SocketMessage.UNMATCH: {
          if (res.data !== undefined) {
            const rm: UNMATCH = JSON.parse(res.data)
            await Matching.unmatch(rm)
            rm.result = { value: `You have successfully unmatched ${String(rm.matchUserTwitch.name)}.` }
            socket.send(this.socketMessage(SocketMessage.UNMATCH, JSON.stringify(rm)))
          }
          break
        }
      }
    }).catch(err => {
      if (err.message === SocketMessage.UNREGISTERED) {
        socket.send(this.socketMessage(SocketMessage.UNREGISTERED, ''))
      } else if (err.message === SocketMessage.TAKEABREAK) {
        socket.send(this.socketMessage(SocketMessage.TAKEABREAK, ''))
      } else if (err.message !== undefined) {
        Logger.error('Ws.handleMessage()', err)
        socket.send(this.socketMessage(SocketMessage.ERROR, err))
      }
      // Else ignore.
    })
  }

  // https://github.com/websockets/ws#how-to-detect-and-close-broken-connections
  private heartbeat (socket) {
    socket.isAlive = true
  }

  private socketMessage (type: SocketMessage, data: string) {
    return JSON.stringify({ type: type, data: data })
  }

  private readonly validationSchema = schema.create({
    type: schema.enum(Object.values(SocketMessage)),
    data: schema.string.optional(),
  })

  private readonly interval = setInterval(() => {
    // Forceful "any" to make sure we can use "isAlive".
    this.server.clients.forEach((ws: Websocket) => {
      console.log('HEARTBEAT PINGING', ws.connection.remoteAddress)

      if (!ws.isAlive) {
        return ws.terminate()
      }

      ws.isAlive = false

      // Ping
      ws.send('9')
    })
  }, 30000)
}

/**
 * This makes our service a singleton
 */
export default new Ws()

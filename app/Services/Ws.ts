import bourne from '@hapi/bourne'
import Twitch from '@ioc:Adonis/Addons/Twitch'
import Logger from '@ioc:Adonis/Core/Logger'
import Server from '@ioc:Adonis/Core/Server'
import { schema, validator } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import {
  BASE,
  BIO,
  EMOTES,
  JOINCHAT,
  MessageType,
  More,
  NameAndId,
  REQUESTRESPONSE,
  ROLLMATCH,
  UNMATCH,
} from 'befriendlier-shared'
import { IncomingMessage } from 'http'
import { Socket } from 'net'
import PQueue from 'p-queue'
import WS from 'ws'
import TwitchConfig from '../../config/twitch'
import Handler from './Handler'

interface Token {
  expiration: Date
  superSecret: string
  refreshToken: string
}

export interface ExtendedWebSocket extends WS {
  id: string
  connection: Socket
  channels: NameAndId[]
  isAlive: boolean
}

interface ExtendedJOINCHAT extends JOINCHAT {
  socketId: string
}

interface REQUEST {
  id: string
  sockets: Array<{ id: string, value: any }>
  func: Function
  value: any
  by: any
  total: number
}

class Ws {
  public isReady = false
  public server: WS.Server
  private readonly requests = new Map<string, REQUEST>()

  private token: Token
  private reconnectTimeout: NodeJS.Timeout

  public readonly queue = new PQueue({ concurrency: 1 })

  public start (callback: (socket: ExtendedWebSocket, request: IncomingMessage) => void) {
    this.server = new WS.Server({ server: Server.instance })
    this.server.on('connection', callback)
    this.isReady = true

    this.server.on('close', () => {
      clearInterval(this.interval)
    })

    // Connect to Twitch
    this.token = {
      expiration: new Date(Date.now() - 1),
      superSecret: TwitchConfig.superSecret,
      refreshToken: TwitchConfig.refreshToken,
    }

    this.startTwitch()
  }

  public startTwitch () {
    if (this.reconnectTimeout !== undefined) {
      clearTimeout(this.reconnectTimeout)
    }

    this.refreshTwitchToken(this.token).then(async res => {
      if (res.superSecret !== this.token.superSecret) {
        this.token = res

        // Send new token to all clients.
        for (const client of this.server.clients) {
          const socket = client as ExtendedWebSocket

          socket.send(this.socketMessage(MessageType.TOKEN, JSON.stringify(this.token)))
        }
      }

      this.reconnectTimeout = setTimeout(() => this.startTwitch(), 5000)
    }).catch((error) => {
      Logger.error({ err: error }, 'Twitch.start(): Something went wrong trying to refresh token!')
      this.reconnectTimeout = setTimeout(() => this.startTwitch(), 1000)
    })
  }

  // Is called from "start/socket.ts" file.
  public async onMessage (socket: ExtendedWebSocket, msg: WS.Data) {
    return await new Promise((resolve) => {
      Logger.debug({ msg }, 'Ws.onMessage()')
      let json

      try {
        json = bourne.parse(msg, null, { protoAction: 'remove' })
      } catch (error) {
        // Data's not JSON.
        Logger.error({ err: error }, 'Ws.onMessage(): Error with parsing websocket data.')
        return
      }

      validator.validate({
        schema: this.validationSchema,
        data: json,
        messages: {
          type: 'Invalid type.',
        },
        cacheKey: 'websocket',
      }).then(async res => {
        switch (res.type) {
          case MessageType.PING: {
            if (res.data !== undefined) {
              socket.send(this.socketMessage(MessageType.PING, res.data))
            }
            // TODO: HANDLE HEALTHCHECK
            break
          }
          case MessageType.ROLLMATCH: {
            if (res.data !== undefined) {
              const rm: ROLLMATCH = JSON.parse(res.data)
              const { user, profile } = await Handler.rollMatch(rm)

              const bio = profile.bio.split(' ').map(word => `${word.substr(0, 1)}\u{E0000}${word.substr(1)}`).join(' ')

              switch (rm.more) {
                case More.NONE:
                  rm.result = {
                    value: `new ${rm.global === true ? 'global ' : ''}match's bio: ` +
                    `${profile.bio.length > 32 ? `${bio.substr(0, 32)}...` : bio}, reply with %prefix%more, %prefix%match or %prefix%no`,
                  }
                  socket.send(this.socketMessage(MessageType.ROLLMATCH, JSON.stringify(rm)))
                  break

                case More.BIO:
                  rm.result = {
                    value: `${rm.global === true ? 'global\'s ' : ''}full bio: ` +
                    `${bio}`,
                  }
                  socket.send(this.socketMessage(MessageType.ROLLMATCH, JSON.stringify(rm)))
                  break
                case More.FAVORITEEMOTES:
                  rm.result = {
                    value: `${rm.global === true ? 'global ' : ''}match's favorite emotes: ` +
                    `${profile.favoriteEmotes.length > 0 ? profile.favoriteEmotes.map(emote => emote.name).join(' ') : 'None.'}`,
                  }
                  socket.send(this.socketMessage(MessageType.ROLLMATCH, JSON.stringify(rm)))
                  break
                case More.FAVORITESTREAMERS: {
                  await user.preload('favoriteStreamers')

                  const favoriteStreamers = user.favoriteStreamers.map(streamer => `${streamer.name.substr(0, 1)}\u{E0000}${streamer.name.substr(1)}`).join(', ')

                  rm.result = {
                    value: `${rm.global === true ? 'global ' : ''}match's favorite streamers: ` +
                    `${user.favoriteStreamers.length > 0 ? favoriteStreamers : 'None'}.`,
                  }
                  socket.send(this.socketMessage(MessageType.ROLLMATCH, JSON.stringify(rm)))
                  break
                }
              }
            }
            break
          }
          case MessageType.MATCH: {
            if (res.data !== undefined) {
              const data: BASE = JSON.parse(res.data)
              const result = await Handler.match(data)
              switch (result.attempt) {
                case MessageType.MATCH: {
                  // Attempted to match. Must wait for receiving end.
                  data.result = {
                    value: `you are attempting to match with a ${data.global === true ? 'global ' : ''}user. Good luck! ` +
                    'You will receive a notification on a successful match!',
                  }
                  socket.send(this.socketMessage(MessageType.MATCH, JSON.stringify(data)))
                  break
                }
                case MessageType.SUCCESS: {
                  if (result.matchUser !== undefined) {
                    // Successfully matched!
                    data.result = {
                      matchUsername: result.matchUser.name,
                      value: 'you have matched with %s%! Send them a message?',
                    }
                    socket.send(this.socketMessage(MessageType.SUCCESS, JSON.stringify(data)))
                  }
                  break
                }
              }
            }
            break
          }
          case MessageType.MISMATCH: {
            if (res.data !== undefined) {
              const data: BASE = JSON.parse(res.data)
              await Handler.mismatch(data)
              data.result = { value: 'FeelsBadMan Better luck next time!' }
              socket.send(this.socketMessage(MessageType.MISMATCH, JSON.stringify(data)))
            }
            break
          }
          case MessageType.UNMATCH: {
            if (res.data !== undefined) {
              const data: UNMATCH = JSON.parse(res.data)
              const hasUnmatched = await Handler.unmatch(data)
              data.result = {
                value: `you have ${hasUnmatched
                  ? `successfully unmatched with ${String(data.matchUserTwitch.name)}.`
                  : 'unsuccessfully unmatched. FeelsBadMan In fact, you were never matched with them to begin with...'
                }`,
              }
              socket.send(this.socketMessage(MessageType.UNMATCH, JSON.stringify(data)))
            }
            break
          }
          case MessageType.JOINCHAT: {
            if (res.data !== undefined) {
              const data: ExtendedJOINCHAT = JSON.parse(res.data)
              const user = await User.findBy('twitchID', data.joinUserTwitch.id)

              data.socketId = socket.id

              if (user === null) {
                data.result = {
                  value: 'user does not exist in the database.' +
                  'Can only add favorited or otherwise registered users.',
                }
                socket.send(this.socketMessage(MessageType.ERROR, JSON.stringify(data)))
                return
              }

              user.host = true
              await user.save()

              this.request(data, this.addHost)
            }
            break
          }
          case MessageType.CHATS: {
            if (res.data !== undefined) {
              const data = JSON.parse(res.data)
              if (data.requestTime !== undefined) {
                // This is a request, probably by the "@@join" command.
                this.parseRequestResponse(socket, data)
              } else {
                // Client has sent back a list of all channels.

                const socketChannels: Array<{ id: string, channels: string[] }> = []

                /**
               * Make a validation check to make sure that this bot
               * hasn't joined any duplicate channels from other bots.
               */

                for (const client of this.server.clients) {
                  const sock = client as ExtendedWebSocket

                  socketChannels.push({ id: sock.id, channels: sock.channels.map(channel => channel.id) })
                }

                for (let index = 0; index < data.value.length; index++) {
                  const channel = data.value[index]

                  const foundChannel = socketChannels.find(sock => sock.channels.includes(channel.id))

                  if (foundChannel !== undefined) {
                    const data = { leaveUserTwitch: channel }
                    socket.send(this.socketMessage(MessageType.LEAVECHAT, JSON.stringify(data)))
                  } else {
                    socket.channels.push({ id: channel.id, name: channel.name })
                  }
                }

                // WARNING: THE FOLLOWING CODE IS SPAGHETTI. TODO: FIX THIS MESS.

                // Add channels not yet handled by any client.
                const allHostedUsers = (await User.query().where({ host: true })).map(user => {
                  return { id: user.twitchID, name: user.name }
                })

                const flattenedArrayOfJoinedChannelIds =
                socketChannels.map(sock => sock.channels).flat()

                const userIdsNotHosted =
                allHostedUsers
                  .filter(user => !flattenedArrayOfJoinedChannelIds.includes(user.id))
                  .map(user => user.id)

                for (let index = 0; index < userIdsNotHosted.length; index++) {
                  const userIdNotHosted = userIdsNotHosted[index]
                  const userNotHosted = allHostedUsers.find(user => user.id === userIdNotHosted) as NameAndId

                  // Get socket with lowest joined channels.
                  socketChannels.sort((a, b) => {
                    return a.channels.length - b.channels.length
                  })

                  // Udate current temporary array with channel count
                  socketChannels[0].channels.push(userNotHosted.id)

                  for (const client of this.server.clients) {
                    const sock = client as ExtendedWebSocket
                    if (sock.id === socketChannels[0].id) {
                      const data = { joinUserTwitch: userNotHosted }

                      sock.channels.push(userNotHosted)

                      sock.send(this.socketMessage(MessageType.JOINCHAT, JSON.stringify(data)))
                      break
                    }
                  }
                }
              }
            }
            break
          }
          case MessageType.WELCOME: {
            if (res.data === undefined) {
              // A new websocket has connected/reconnected.

              // Send the current Twitch chat connection token
              socket.send(this.socketMessage(MessageType.TOKEN, JSON.stringify(this.token)))

              // Request an array of all chats client is connected to.
              socket.send(this.socketMessage(MessageType.CHATS, JSON.stringify('')))
            }
            break
          }
          case MessageType.EMOTES: {
            if (res.data !== undefined) {
              const data: EMOTES = JSON.parse(res.data)

              // static-cdn.jtvnw.net/emoticons/v1/${matchesTwitch.id}/3.0
              await Handler.setEmotes(data)

              data.result = { value: `Successfully set the following emotes: ${String(data.emotes.map(emote => emote.name).join(' '))}` }
              socket.send(this.socketMessage(MessageType.EMOTES, JSON.stringify(data)))
            }
            break
          }
          case MessageType.BIO: {
            if (res.data !== undefined) {
              const data: BIO = JSON.parse(res.data)

              const bio = (await Handler.setBio(data)).split(' ').map(word => `${word.substr(0, 1)}\u{E0000}${word.substr(1)}`).join(' ')

              data.result = { value: `Successfully set your ${data.global === true ? 'global ' : ''}bio. Here's a part of it: ${bio.length > 32 ? `${bio.substr(0, 32)}...` : bio}` }
              socket.send(this.socketMessage(MessageType.BIO, JSON.stringify(data)))
            }
          }
          // case MessageType.TOKEN: {
          //   socket.send(this.socketMessage(MessageType.TOKEN, JSON.stringify(this.token)))
          //   break
          // }
        }
        resolve()
      }).catch(error => {
        if (error.message === MessageType.UNREGISTERED) {
          socket.send(this.socketMessage(MessageType.UNREGISTERED, JSON.stringify(error.data)))
        } else if (error.message === MessageType.TAKEABREAK) {
          socket.send(this.socketMessage(MessageType.TAKEABREAK, JSON.stringify(error.data)))
        } else if (error.message === MessageType.ERROR && error.data !== undefined) {
          socket.send(this.socketMessage(MessageType.ERROR, JSON.stringify(error.data)))
        } else if (error.message !== undefined) {
          Logger.error({ err: error }, 'Ws.handleMessage()')
          // socket.send(this.socketMessage(MessageType.ERROR, JSON.stringify(error)))
        }
        // Else ignore.
        resolve()
      })
    })
  }

  public onClose (socket: ExtendedWebSocket, code: number, reason: string) {
    Logger.warn(`WEBSOCKET CLOSED: [${socket.id}] from ${prettySocketInfo(socket.connection)}, code: ${code}${reason.length > 0 ? `, reason:\n${reason}` : ''}`)
  }

  public onError (socket: ExtendedWebSocket, error: Error) {
    Logger.error({ err: error }, `WEBSOCKET ERROR: [${socket.id}] from ${prettySocketInfo(socket.connection)}.`)
  }

  // https://github.com/websockets/ws#how-to-detect-and-close-broken-connections
  public heartbeat (socket: ExtendedWebSocket, data: Buffer) {
    if (data.length > 0) {
      Logger.info(`PING MESSAGE: [${socket.id}] from ${prettySocketInfo(socket.connection)} \n${data.toString()}`)
    }
    socket.isAlive = true
  }

  /**
   * Tell a bot to join the following user's chat.
   */
  private addHost (request: REQUEST) {
    // Make sure channel isn't already added by another bot.
    const foundChannelBot = request.sockets.find(sockRes => sockRes.value.includes(request.by.joinUserTwitch.name))

    if (foundChannelBot !== undefined) {
      for (const client of this.server.clients) {
        const socket = client as ExtendedWebSocket

        if (socket.id === request.by.socketId) {
          const data: BASE = {
            channelTwitch: request.by.channelTwitch,
            userTwitch: request.by.userTwitch,
            result: {
              value: `channel already added by bot "${foundChannelBot.id}".`,
            },
          }

          socket.send(this.socketMessage(MessageType.ERROR, JSON.stringify(data)))
          break
        }
      }

      this.requests.delete(request.id)
      return
    }

    // Get socket with lowest joined channels.
    const sortedAsc = request.sockets.sort((a, b) => {
      return a.value.length - b.value.length
    })

    for (const client of this.server.clients) {
      const socket = client as ExtendedWebSocket

      if (socket.id === sortedAsc[0].id) {
        const data = { joinUserTwitch: request.by.joinUserTwitch }

        socket.channels.push(request.by.joinUserTwitch)

        socket.send(this.socketMessage(MessageType.JOINCHAT, JSON.stringify(data)))

        this.requests.delete(request.id)
        break
      }
    }
  }

  private parseRequestResponse (socket: ExtendedWebSocket, message: REQUESTRESPONSE) {
    const req = this.requests.get(message.requestTime)

    if (req === undefined) {
      Logger.error(`Ws.parseRequestResponse(): Undefined requestResponse by socket ${socket.id}: %O`, message)
      return
    }

    req.sockets.push({ id: socket.id, value: message.value })

    if (req.sockets.length === req.total) {
      req.func.bind(this)(req)
    }
  }

  private request (by, func, value?) {
    const requestTime = Date.now().toString()
    this.requests.set(requestTime, {
      id: requestTime,
      sockets: [],
      func,
      value,
      by,
      total: 0,
    })

    // Force into REQUEST because we've defined it above, there's no risk of it being undefined.
    const req = this.requests.get(requestTime) as REQUEST

    this.server.clients.forEach((socket: ExtendedWebSocket) => {
      socket.send(this.socketMessage(MessageType.CHATS, JSON.stringify(requestTime)))
      req.total++
    })
  }

  public socketMessage (type: MessageType, data: string) {
    return JSON.stringify({ type: type, data: data, timestamp: Date.now() })
  }

  private async refreshTwitchToken (token: Token): Promise<Token> {
    const newToken = { ...token }
    if (Date.now() > token.expiration.getTime()) {
      // Generate a token!
      const twitch = await Twitch.refreshToken(this.token.refreshToken)

      if (twitch === null) {
        throw new Error('Couldn\'t login to Twitch!')
      }

      newToken.expiration = new Date(Date.now() + (twitch.expires_in * 1000))
      newToken.superSecret = twitch.access_token
      newToken.refreshToken = twitch.refresh_token

      return newToken
    }

    return newToken
  }

  private readonly validationSchema = schema.create({
    type: schema.enum(Object.values(MessageType)),
    data: schema.string.optional(),
    timestamp: schema.number(),
  })

  private readonly interval = setInterval(() => {
    if (!this.isReady) {
      return
    }

    this.server.clients.forEach((socket: ExtendedWebSocket) => {
      Logger.debug(`PINGING: [${socket.id}] from ${prettySocketInfo(socket.connection)}.`)

      if (!socket.isAlive) {
        Logger.warn(`PING FAILED: [${socket.id}] from ${prettySocketInfo(socket.connection)}. TERMINATING.`)
        return socket.terminate()
      }

      socket.isAlive = false

      // Ping
      socket.ping()
    })
  }, 1000)
}

export function prettySocketInfo (connection: Socket) {
  return `(${String(connection.remoteFamily)}) ${String(connection.remoteAddress)}:${String(connection.remotePort)}`
}

/**
 * This makes our service a singleton
 */
export default new Ws()

import Logger from '@ioc:Adonis/Core/Logger'
import Ws, { prettySocketInfo } from 'App/Services/Ws'
import { MessageType } from 'befriendlier-shared'

Ws.start((socket, request) => {
  request.socket.pause()

  const xForwardedFor = request.headers['x-forwarded-for'] as string | undefined
  const xRealIp = request.headers['x-real-ip'] as string | undefined

  const allow = typeof xForwardedFor !== 'string' && typeof xRealIp !== 'string'
  const allowHost = request.headers.host === 'localhost:3000'

  // Kill connections from NON-LOCALHOST sources. TODO: Setup "Trusted Sources" later.
  if (!allow && !allowHost) {
    Logger.warn('WEBSOCKET CONNECTION FROM A NON ALLOWED SOURCE! ' +
    `X-Forwarded-For:${String(xForwardedFor)}, xRealIp:${String(xRealIp)}, host:${String(request.headers.host)}`)
    socket.terminate()
    return
  }

  const userAgent = request.headers['user-agent']

  if (userAgent === undefined) {
    Logger.warn(`NO USER-AGENT: Connection from ${prettySocketInfo(request.socket)}. TERMINATING.`)
    socket.terminate()
    return
  }

  request.socket.resume()

  // On a new connection.
  socket.id = userAgent
  socket.connection = request.socket
  socket.channels = []
  socket.isAlive = true

  Logger.info(`NEW CONNECTION: [${socket.id}] from ${prettySocketInfo(socket.connection)}.`)

  // eslint-disable-next-line no-void
  socket.on('message', (msg) => void Ws.queue.add(async () => await Ws.onMessage(socket, msg)))

  socket.on('close', (code, reason) => Ws.onClose(socket, code, reason))

  socket.on('error', (error) => Ws.onError(socket, error))

  // https://github.com/websockets/ws#how-to-detect-and-close-broken-connections
  socket.on('pong', (data) => Ws.heartbeat(socket, data))

  // Send "welcome" to client.
  socket.send(Ws.socketMessage(MessageType.WELCOME, JSON.stringify('')))
})

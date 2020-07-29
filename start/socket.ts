import Ws from 'App/Services/Ws'
import Logger from '@ioc:Adonis/Core/Logger'

Ws.start((socket, request) => {
  const userAgent = request.headers['user-agent']

  if (userAgent === undefined) {
    Logger.warn(null,
      'Terminating attempted websocket connection from (%s) %s:%s',
      request.socket.remoteFamily,
      request.socket.remoteAddress,
      request.socket.remotePort,
    )

    socket.terminate()
    return
  }

  Logger.info('New websocket connection by %s', userAgent)

  // On a new connection.
  socket.id = userAgent
  socket.isAlive = true
  socket.connection = request.socket

  socket.on('message', (msg) => Ws.onMessage(socket, msg))
})

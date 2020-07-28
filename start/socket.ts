import Ws from 'App/Services/Ws'

Ws.start((socket, request) => {
  const userAgent = request.headers['user-agent']

  if (userAgent === undefined) {
    console.log(
      'Terminating attempted websocket connection from (%s) %s:%n',
      request.socket.remoteAddress,
      request.socket.remotePort,
      request.socket.remoteFamily,
    )

    socket.terminate()
    return
  }

  console.log('New websocket connection by %s', userAgent)

  // On a new connection.
  socket.id = userAgent
  socket.isAlive = true
  socket.connection = request.socket

  socket.on('message', (msg) => Ws.onMessage(socket, msg))
})

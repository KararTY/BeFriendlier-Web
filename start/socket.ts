import Ws from 'App/Services/Ws'

Ws.start((socket, request) => {
  console.log('New connection from:', request.socket.remoteAddress)

  // On a new connection.
  socket.isAlive = true
  socket.connection = request.socket

  socket.on('message', (msg) => Ws.onMessage(socket, msg))
})

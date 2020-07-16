import Ws from 'App/Services/Ws'

// https://github.com/websockets/ws#how-to-detect-and-close-broken-connections

function heartbeat () {
  this.isAlive = true
}

Ws.start(socket => {
  // On a new connection.
  socket.isAlive = true
  socket.on('pong', heartbeat)
})

Ws.server.on('message', msg => {
  console.log(msg)
})

// Ping
const interval = setInterval(() => {
  // Forceful "any" to make sure every ws socket can be extended with "isAlive".
  Ws.server.clients.forEach((ws: any) => {
    if (ws.isAlive === false) {
      return ws.terminate()
    }

    ws.isAlive = false
    ws.ping(() => {})
  })
}, 30000)

Ws.server.on('close', function close () {
  clearInterval(interval)
})

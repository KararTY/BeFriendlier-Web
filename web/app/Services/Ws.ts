import WS from 'ws'
import Server from '@ioc:Adonis/Core/Server'
import * as http from 'http'

class Ws {
  public isReady = false
  public server: WS.Server

  public start (callback: (socket, request: http.IncomingMessage) => void) {
    this.server = new WS.Server({ server: Server.instance })
    this.server.on('connection', callback)
    this.isReady = true
  }
}

/**
 * This makes our service a singleton
 */
export default new Ws()

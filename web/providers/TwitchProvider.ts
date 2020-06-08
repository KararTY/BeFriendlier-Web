import { IocContract } from '@adonisjs/fold'
import Client from '../src/Twitch'

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready, when this file is loaded by the framework.
| Hence, the level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
|
| @example:
|
| public async ready () {
|   const Database = (await import('@ioc:Adonis/Lucid/Database')).default
|   const Event = (await import('@ioc:Adonis/Core/Event')).default
|   Event.on('db:query', Database.prettyPrint)
| }
|
*/
export default class TwitchProvider {
  constructor (protected container: IocContract) {
  }

  public register () {
    // Register your own bindings
    this.container.singleton('Adonis/Addons/Twitch', app => {
      const config = app.use('Adonis/Core/Env')

      const TwitchInstance = new Client(config)

      return TwitchInstance
    })
  }

  public async boot () {
    // All bindings are ready, feel free to use them
  }

  public async ready () {
    // App is ready
  }

  public async shutdown () {
    // Cleanup, since app is going down
  }
}

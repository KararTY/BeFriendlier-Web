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
*/
export default class TwitchProvider {
  constructor (protected container: IocContract) {
  }

  public register () {
    // Register your own bindings
    this.container.singleton('Adonis/Addons/Twitch', app => {
      const env = app.use('Adonis/Core/Env')
      const config = app.use('Adonis/Core/Config')
      const logger = app.use('Adonis/Core/Logger')

      const TwitchInstance = new Client(env, config, logger)

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

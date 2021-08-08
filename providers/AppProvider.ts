import { IocContract } from '@adonisjs/fold'
import feather from 'feather-icons'
import { TwitchAuth, PerspectiveAPI } from 'befriendlier-shared'

export default class AppProvider {
  constructor (protected container: IocContract) {
  }

  public register () {
    // Register your own bindings
    this.container.singleton('Befriendlier-Shared/Twitch', app => {
      const config = app.use('Adonis/Core/Config')
      const logger = app.use('Adonis/Core/Logger')

      return new TwitchAuth({
        clientToken: config.get('twitch.clientToken'),
        clientSecret: config.get('twitch.clientSecret'),
        redirectURI: config.get('twitch.redirectURI'),
        scope: config.get('twitch.scope'),
        headers: config.get('twitch.headers'),
      }, logger.level)
    })

    this.container.singleton('Befriendlier-Shared/PerspectiveAPI', app => {
      const config = app.use('Adonis/Core/Config')
      const logger = app.use('Adonis/Core/Logger')

      return new PerspectiveAPI({
        token: config.get('perspective.token'),
        throttleInMs: config.get('perspective.throttleInMs'),
        headers: config.get('perspective.headers'),
      }, logger.level)
    })
  }

  public async boot () {
    // IoC container is ready
    const View = (await import('@ioc:Adonis/Core/View')).default
    const Twitch = (await import('@ioc:Befriendlier-Shared/Twitch')).default

    View.global('icon', (iconName: string, size?: 'big' | 'small') => {
      let opts: { width: number, height: number }

      if (size === 'big') {
        opts = { width: 48, height: 48 }
      } else if (size === 'small') {
        opts = { width: 16, height: 16 }
      } else {
        opts = { width: 24, height: 24 }
      }

      return feather.icons[iconName].toSvg(opts)
    })

    View.global('twitchAuthURL', (csrfToken: string) => {
      return Twitch.authorizationURL(csrfToken)
    })
  }

  public shutdown () {
    // Cleanup, since app is going down
  }

  public async ready () {
    // App is ready
    const App = await import('@ioc:Adonis/Core/Application')

    /**
     * Only import files, when environment is `web`. In other
     * words do not import during ace commands.
     */
    if (App.default.environment === 'web') {
      await import('../start/socket')
    }
  }
}

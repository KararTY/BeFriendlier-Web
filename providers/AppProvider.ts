import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import feather from 'feather-icons'
import { TwitchAuth, PerspectiveAPI, PajbotAPI } from 'befriendlier-shared'

export default class AppProvider {
	public static needsApplication = true

  constructor (protected app: ApplicationContract) {}

  public register () {
    // Register your own bindings
    const config = this.app.container.resolveBinding('Adonis/Core/Config')
    const Logger = this.app.container.resolveBinding('Adonis/Core/Logger')

    this.app.container.singleton('Befriendlier-Shared/Twitch', () => {
      return new TwitchAuth({
        clientToken: config.get('twitch.clientToken'),
        clientSecret: config.get('twitch.clientSecret'),
        redirectURI: config.get('twitch.redirectURI'),
        scope: config.get('twitch.scope'),
        headers: config.get('twitch.headers'),
      }, Logger.level)
    })

    this.app.container.singleton('Befriendlier-Shared/PerspectiveAPI', () => {
      return new PerspectiveAPI({
        token: config.get('perspective.token'),
        throttleInMs: config.get('perspective.throttleInMs'),
        headers: config.get('perspective.headers'),
      }, Logger.level)
    })

    this.app.container.singleton('Befriendlier-Shared/PajbotAPI', () => {
      return new PajbotAPI({
        enabled: config.get('pajbot.enabled'),
        channels: config.get('pajbot.channels'),
        headers: config.get('pajbot.headers'),
      }, Logger.level)
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

    // For flashMessage.get('errors')
    View.global('readableErrors', (error: any) => {
      const errorObject = Object.entries(error)

      let message = 'Error:'
      for (let index = 0; index < errorObject.length; index++) {
        const [key, value] = errorObject[index]
        message += ` (${key}) ${value}`
      }

      return message
    })

    View.global('twitchAuthURL', (csrfToken: string) => {
      return Twitch.authorizationURL(csrfToken)
    })
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

  public shutdown () {
    // Cleanup, since app is going down
  }
}

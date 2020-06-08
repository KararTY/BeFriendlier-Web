import { IocContract } from '@adonisjs/fold'
import feather from 'feather-icons'

export default class AppProvider {
  constructor (protected $container: IocContract) {
  }

  public register () {
    // Register your own bindings
  }

  public async boot () {
    // IoC container is ready
    const View = (await import('@ioc:Adonis/Core/View')).default
    const Env = (await import('@ioc:Adonis/Core/Env')).default

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

    View.global('twitchAuth', (csrfToken: string) => {
      let url = 'https://id.twitch.tv/oauth2/authorize?response_type=code'

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      url += `&client_id=${Env.get('TWITCH_CLIENT_TOKEN', '')}`
      url += `&redirect_uri=${'http://localhost:3333/register'}`
      url += '&force_verify=true'
      url += `&state=${csrfToken}`

      return url
    })
  }

  public shutdown () {
    // Cleanup, since app is going down
  }

  public ready () {
    // App is ready
  }
}

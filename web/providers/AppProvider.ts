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

    View.global('icon', (iconName: string, size?: 'big' | 'small' ) => {
      let opts: { width: number; height: number }

      if (size === 'big') opts = { width: 48, height: 48 }
      if (size === 'small') opts = { width: 16, height: 16 }
      else opts = { width: 24, height: 24 }

      return feather.icons[iconName].toSvg(opts)
    })
  }
 
  public shutdown () {
    // Cleanup, since app is going down
  }

  public ready () {
    // App is ready
  }
}

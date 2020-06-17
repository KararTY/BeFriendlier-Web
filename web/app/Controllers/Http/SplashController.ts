import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SplashController {
  public async index ({ auth, view }: HttpContextContract) {
    /**
   * Send back statistics:
   * Total users
   * Total channels
   * New matches
   * New channels
   */
    return view.render('core', {
      user: auth.user?.toJSON(),
      web: {
        template: 'splash',
        title: 'Find friends!',
        statistics: {
          channels: {
            total: 0,
            new: 0,
          },
          users: {
            total: 0,
            matched: 0,
          },
        },
      },
    })
  }
}

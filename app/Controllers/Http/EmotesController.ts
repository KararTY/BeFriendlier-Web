import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EmotesController {
  public async read ({ auth, view }: HttpContextContract) {
    if (auth.user === undefined) {
      return
    }

    const totalEmotes = auth.user.emotes.reduce((acc, cur) => acc + (cur.amount || 0), 0)

    return view.render('core', {
      user: auth.user.toJSON(),
      totalEmotes,
      web: {
        template: 'emotes',
        title: `User emotes - ${auth.user.displayName}`,
      },
    })
  }
}

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Emote from 'App/Models/Emote'

export default class EmotesController {
  public async read ({ auth, view }: HttpContextContract) {
    if (auth.user === undefined) {
      return
    }

    await auth.user.load('emotes')

    const emotes = auth.user.emotes.map(e => e.serialize())
    for (let index = 0; index < emotes.length; index++) {
      emotes[index] = { ...emotes[index], ...(await Emote.find(emotes[index].emote_id))?.serialize() }
    }

    const totalEmotes = emotes.reduce((acc, cur) => acc + (cur.amount || 0), 0)

    return await view.render('core', {
      user: auth.user.toJSON(),
      web: {
        template: 'emotes',
        title: `User emotes - ${auth.user.displayName}`,
        emotes,
        totalEmotes,
      },
    })
  }
}

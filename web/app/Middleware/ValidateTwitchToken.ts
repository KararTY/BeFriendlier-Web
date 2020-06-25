import { DateTime } from 'luxon'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Twitch from '@ioc:Adonis/Addons/Twitch'

export default class ValidateTwitchToken {
  private async validate ({ session, auth }: HttpContextContract) {
    if (session.get('token') !== undefined) {
      const lastValidate = session.get('lastValidate') as string | undefined

      if (lastValidate !== undefined && (DateTime.fromISO(lastValidate).diffNow('minutes').minutes > -59)) {
        return
      }

      const validatedToken = await Twitch.validateToken(session.get('token'))

      session.put('lastValidate', new Date())

      if (validatedToken === null) {
        session.flash('message', {
          error: 'Error: You have disconnected our app from your Twitch connections.' +
          // eslint-disable-next-line comma-dangle
          'If you would like to not use our service anymore, please relogin and delete your data.'
        })
        session.put('errorValidate', true)
        await auth.logout()
      } else {
        session.forget('errorValidate')
      }
    } else {
      session.flash('message', { error: 'Error: Please relogin.' })
      session.put('errorValidate', true)
      await auth.logout()
    }
  }

  public async handle (ctx: HttpContextContract, next: () => Promise<void>) {
    if (ctx.session.get('errorRefresh') === undefined) {
      await this.validate(ctx)
    }

    await next()
  }
}

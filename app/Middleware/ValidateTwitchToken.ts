import Twitch from '@ioc:Befriendlier-Shared/Twitch'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'

export default class ValidateTwitchToken {
  private async validate ({ session, auth }: HttpContextContract) {
    if (session.get('token') !== undefined) {
      const nextValidate = session.get('nextValidate') as string | undefined

      if (nextValidate !== undefined && (DateTime.fromISO(nextValidate).diffNow('minutes').minutes <= 0)) {
        return
      }

      const validatedToken = await Twitch.validateToken(session.get('token'))

      session.put('nextValidate', DateTime.fromJSDate(new Date()).plus({ hours: 1 }).toJSDate())

      if (validatedToken === null) {
        session.flash('message', {
          error: 'Error: You have disconnected the service from your Twitch connections.' +
          // eslint-disable-next-line comma-dangle
          'If you would like to not use the service anymore, please relogin and delete your data.'
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

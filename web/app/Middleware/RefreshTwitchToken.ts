import { DateTime } from 'luxon'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Twitch from '@ioc:Adonis/Addons/Twitch'

export default class RefreshTwitchToken {
  private async refresh ({ session, auth }: HttpContextContract) {
    if (session.get('token') !== undefined) {
      const lastRefresh = session.get('lastRefresh') as string | undefined

      if (lastRefresh !== undefined && (DateTime.fromISO(lastRefresh).diffNow('minutes').minutes > -59)) {
        return
      }

      const twitchBody = await Twitch.refreshToken(session.get('refresh'))

      session.put('lastRefresh', new Date())

      if (twitchBody !== null) {
        session.put('token', twitchBody.access_token)
        session.put('refresh', twitchBody.refresh_token)
        session.forget('errorRefresh')
      } else {
        session.flash('message', { error: 'Error: Something went wrong with Twitch. Try again later.' })
        session.put('errorRefresh', true)
        await auth.logout()
      }
    } else {
      session.flash('message', { error: 'Error: Please relogin.' })
      session.put('errorRefresh', true)
      await auth.logout()
    }
  }

  public async handle (ctx: HttpContextContract, next: () => Promise<void>) {
    if (ctx.session.get('errorValidate') === undefined) {
      await this.refresh(ctx)
    }

    await next()
  }
}

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Twitch from '@ioc:Befriendlier-Shared/Twitch'
import { DateTime } from 'luxon'

export default class RefreshTwitchToken {
  private async refresh ({ session, auth }: HttpContextContract): Promise<undefined> {
    if (session.get('token') !== undefined) {
      const nextRefresh = session.get('nextRefresh') as string | undefined

      if (nextRefresh !== undefined && (DateTime.fromISO(nextRefresh).diffNow('minutes').minutes <= 0)) {
        return
      }

      const twitchBody = await Twitch.refreshToken(session.get('refresh'))

      session.put('nextRefresh', DateTime.fromJSDate(new Date()).plus({ hours: 1 }).toJSDate())

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

  public async handle (ctx: HttpContextContract, next: () => Promise<void>): Promise<void> {
    if (ctx.session.get('errorValidate') === undefined) {
      await this.refresh(ctx)
    }

    await next()
  }
}

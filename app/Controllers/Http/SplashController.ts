import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { DateTime } from 'luxon'

let splashLastUpdate = DateTime.fromJSDate(new Date())
let statistics = {
  users: {
    total: 0,
    new: 0,
  },
  channels: {
    total: 0,
    new: 0,
  },
}

export default class SplashController {
  public async index ({ auth, view }: HttpContextContract) {
    if (splashLastUpdate.diffNow('minutes').minutes <= 0) {
      splashLastUpdate = splashLastUpdate.plus({ minutes: 30 })
      await this.refreshStatistics()
    }

    return view.render('core', {
      user: auth.user?.toJSON(),
      web: {
        template: 'splash',
        title: 'Find friends!',
        statistics: statistics,
      },
    })
  }

  private async refreshStatistics () {
    const dateMidnight = DateTime
      .fromJSDate(new Date())
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toJSDate()

    const countTotalUsers = Database.query().from('users').countDistinct('id as total').first()
    const countTotalChannels = Database.query().from('profiles').countDistinct('chat_user_id as total').first()

    const countNewUsers = Database.query()
      .from('users')
      .whereBetween('created_at', [dateMidnight, new Date()])
      .countDistinct('id as total')
      .first()
    const countNewChannels = Database.query()
      .from('profiles')
      .whereBetween('created_at', [dateMidnight, new Date()])
      .countDistinct('chat_user_id as total')
      .first()

    const [
      { total: totalUsers }, { total: totalChannels }, { total: totalNewUsers }, { total: totalNewChannels },
    ] = await Promise.all([
      countTotalUsers, countTotalChannels, countNewUsers, countNewChannels,
    ])

    statistics = {
      users: {
        total: totalUsers,
        new: totalNewUsers,
      },
      channels: {
        total: totalChannels,
        new: totalNewChannels,
      },
    }
  }
}

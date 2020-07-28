import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'
import User from 'App/Models/User'
import Profile from 'App/Models/Profile'

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
    }
    await this.refreshStatistics()

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

    const countTotalUsers = User.query().count('*', 'total').first()
    const countTotalChannels = User.query().where({ host: true }).count('*', 'total').first()

    const countNewUsers = User.query()
      .whereBetween('createdAt', [dateMidnight, new Date()])
      .count('*', 'total')
      .first()
    const countNewChannels = Profile.query()
      .whereBetween('createdAt', [dateMidnight, new Date()])
      .count('*', 'total')
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

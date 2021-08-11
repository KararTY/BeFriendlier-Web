import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
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
    }
    await this.refreshStatistics()

    return await view.render('core', {
      user: auth.user?.toJSON(),
      web: {
        template: 'splash',
        title: 'Find Twitch people!',
        statistics: statistics,
      },
    })
  }

  public async channels ({ auth, view }: HttpContextContract) {
    const channels = await User.query()
      .where({ host: true })
      .pojo() as User[]

    return await view.render('core', {
      user: auth.user?.toJSON(),
      web: {
        template: 'channels',
        title: 'BeFriendlier\'s joined channels.',
        channels: channels.sort((a, b) => b.emotes.length - a.emotes.length),
      },
    })
  }

  private async refreshStatistics () {
    const dateMidnight = DateTime
      .fromJSDate(new Date())
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toJSDate()

    const countTotalUsers = User.query()
      .where('createdAt', '>', String(DateTime.fromJSDate(new Date('1971')).toSQL()))
      .whereNot('name', '$deleted')
      .pojo<{ total: number }>()
      .count('id as total')
      .first()
    const countNewUsers = User.query()
      .whereBetween('createdAt', [dateMidnight, new Date()])
      .pojo<{ total: number }>()
      .count('id as total')
      .first()

    // const countTotalMatches = Database.query()
    //   .from('matches_lists')
    //   .pojo<{ total: number }>()
    //   .countDistinct(['user_id', '' ])
    // const countNewMatches = Database.query()
    //   .from('matches_lists')

    const countTotalChannels = User.query()
      .where({ host: true })
      .pojo<{ total: number }>()
      .count('id as total')
      .first()
    const countNewChannels = User.query()
      .where({ host: true })
      .pojo<{ total: number }>()
      .whereBetween('createdAt', [dateMidnight, new Date()])
      .count('id as total')
      .first()

    const [
      users, channels , newUsers, newChannels,
    ] = await Promise.all([
      countTotalUsers, countTotalChannels, countNewUsers, countNewChannels,
    ])

    statistics = {
      users: {
        total: users?.total || 0,
        new: newUsers?.total || 0,
      },
      channels: {
        total: channels?.total || 0,
        new: newChannels?.total || 0,
      },
    }
  }
}

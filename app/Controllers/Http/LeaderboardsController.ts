import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

interface UserLeaderboard {
  avatar: string
  display_name: string
  name: string
  total_emotes: number
}

let leaderboardsLastUpdate = DateTime.fromJSDate(new Date())
const leaderboards: { topTenEmotesUsers: UserLeaderboard[] } = {
  topTenEmotesUsers: []
}

export interface LeaderboardEntry {
  user_id: number
  total_emotes: number
}

export default class LeaderboardsController {
  public async index ({ auth, view }: HttpContextContract): Promise<string> {
    if (leaderboardsLastUpdate.diffNow('minutes').minutes <= 0) {
      leaderboardsLastUpdate = leaderboardsLastUpdate.plus({ hours: 1 })
      await this.refreshStatistics()
    }

    let userPosition
    if (auth.user !== undefined) {
      // https://stackoverflow.com/a/55334692
      userPosition = await Database.rawQuery(`
        with temp_table as (
          select *,
                count(*) as cnt,
                row_number() over (order by total_emotes desc) as rn
          from _leaderboards
          group by user_id
        )
        select *
        from temp_table
        where user_id = ${auth.user.id};
      `)
      userPosition = userPosition?.rows[0]
    }

    return await view.render('core', {
      user: auth.user,
      web: {
        userPosition,
        template: 'leaderboards',
        title: 'Leaderboards 🦆 - BeFriendlier',
        leaderboards
      }
    })
  }

  private async refreshStatistics (): Promise<void> {
    const resTopTen = await Database.from('_leaderboards').orderBy('total_emotes', 'desc').limit(10) as LeaderboardEntry[]

    const topTenEmotesUsers: UserLeaderboard[] = []
    for (let index = 0; index < resTopTen.length; index++) {
      const leaderboardEntry = resTopTen[index]

      const user = await User.find(leaderboardEntry.user_id)

      if (user == null) continue

      topTenEmotesUsers.push({
        avatar: user.avatar,
        display_name: user.displayName,
        name: user.name,
        total_emotes: leaderboardEntry.total_emotes
      })
    }

    leaderboards.topTenEmotesUsers = topTenEmotesUsers
  }
}

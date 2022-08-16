import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

interface LeaderboardResponse {
  topTenEmotesUsers: UserLeaderboard[]
  topTenBattlesUsers: UserLeaderboardBattle[]
}

interface UserLeaderboard {
  avatar: string
  display_name: string
  name: string
  total_emotes: number
}

interface UserLeaderboardBattle {
  avatar: string
  display_name: string
  name: string
  total_wins: number
  total_losses: number
}

let leaderboardsLastUpdate = DateTime.fromJSDate(new Date())
const leaderboards: LeaderboardResponse = {
  topTenEmotesUsers: [],
  topTenBattlesUsers: []
}

export interface LeaderboardEntry {
  user_id: number
  total_emotes: number
}

export interface LeaderboardBattleEntry {
  user_id: number
  total_wins: number
  total_losses: number
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
    const resTopTenFarmers = await Database.from('_leaderboards').orderBy('total_emotes', 'desc').limit(10) as LeaderboardEntry[]
    const resTopTenBattles = await Database.from('_leaderboards_battles').orderBy('total_wins', 'desc').limit(10) as LeaderboardBattleEntry[]

    const topTenEmotesUsers: UserLeaderboard[] = []
    for (let index = 0; index < resTopTenFarmers.length; index++) {
      const leaderboardEntry = resTopTenFarmers[index]

      const user = await User.find(leaderboardEntry.user_id)

      if (user == null) continue

      topTenEmotesUsers.push({
        avatar: user.avatar,
        display_name: user.displayName,
        name: user.name,
        total_emotes: leaderboardEntry.total_emotes
      })
    }

    const topTenBattlesUsers: UserLeaderboardBattle[] = []
    for (let index = 0; index < resTopTenBattles.length; index++) {
      const leaderboardEntry = resTopTenBattles[index]

      const user = await User.find(leaderboardEntry.user_id)

      if (user == null) continue

      topTenBattlesUsers.push({
        avatar: user.avatar,
        display_name: user.displayName,
        name: user.name,
        total_wins: leaderboardEntry.total_wins,
        total_losses: leaderboardEntry.total_losses
      })
    }

    leaderboards.topTenEmotesUsers = topTenEmotesUsers
    leaderboards.topTenBattlesUsers = topTenBattlesUsers
  }

  public async battleLeaderboards (): Promise<UserLeaderboardBattle[]> {
    if (leaderboardsLastUpdate.diffNow('minutes').minutes <= 0) {
      leaderboardsLastUpdate = leaderboardsLastUpdate.plus({ hours: 1 })
      await this.refreshStatistics()
    }

    return leaderboards.topTenBattlesUsers
  }
}

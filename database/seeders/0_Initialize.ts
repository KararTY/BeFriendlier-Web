import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import { DateTime } from 'luxon'
import TwitchConfig from '../../config/twitch'

/**
 * Create default database values.
 */
export default class InitializeSeeder extends BaseSeeder {
  public async run () {
    await User.firstOrCreate({
      id: 0,
      twitchID: TwitchConfig.user.id,
      name: TwitchConfig.user.name,
      displayName: TwitchConfig.user.name,
      avatar: '',
      host: true,
      createdAt: DateTime.fromJSDate(new Date('1970-01-01 02:00:00')),
    })
  }
}

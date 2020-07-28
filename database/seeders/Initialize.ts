import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import TwitchConfig from '../../config/twitch'

/**
 * Create default database values.
 */
export default class InitializeSeeder extends BaseSeeder {
  public async run () {
    await User.firstOrCreate({
      twitchID: TwitchConfig.user.id,
      name: TwitchConfig.user.name,
      displayName: TwitchConfig.user.name,
      avatar: '',
      host: true,
    })
  }
}

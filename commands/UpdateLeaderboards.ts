import { BaseCommand } from '@adonisjs/core/build/standalone'

export default class UpdateLeaderboards extends BaseCommand {

  /**
   * Command name is used to run the command
   */
  public static commandName = 'update:leaderboards'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Updates the leaderboards.'

  public static needsApplication = true

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process
     */
    stayAlive: false,
  }

  public async run () {
    const { default: Database } = await import('@ioc:Adonis/Lucid/Database')

    const allUsers = await Database.from('users').select(['id', 'host'])

    for (let index = 0; index < allUsers.length; index++) {
      const { id, host } = allUsers[index]

      if (host) {
        await Database.from('_leaderboards').where({ user_id: id }).delete().catch()
        continue
      }

      const getAllEmoteEntryAmounts = await Database.from('emote_entries').where({ user_id: id }).select('amount') as { amount: number }[]

      const total_emotes = getAllEmoteEntryAmounts.reduce((amt, cur) => amt + cur.amount, 0)

      try {
        await Database.table('_leaderboards').insert({ user_id: id, total_emotes })
      } catch (err) {
        await Database.from('_leaderboards').where({ user_id: id }).update({ total_emotes })
      }
    }

    this.logger.info('[UpdateLeaderboards] Updated leaderboards.')
  }
}

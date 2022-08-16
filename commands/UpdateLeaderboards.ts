import { BaseCommand } from '@adonisjs/core/build/standalone'
import Battle from 'App/Models/Battle'

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
    stayAlive: false
  }

  public async run (): Promise<void> {
    const { default: Database } = await import('@ioc:Adonis/Lucid/Database')

    const allUsers = await Database.from('users').select(['id', 'host'])

    for (let index = 0; index < allUsers.length; index++) {
      const { id, host } = allUsers[index]

      if (host === true) {
        await Database.from('_leaderboards').where({ user_id: id }).delete().catch()
        continue
      }

      const getAllEmoteEntryAmounts = (await Database.from('emote_entries')
        .where({ user_id: id })
        .select('amount')) as Array<{ amount: number }>

      const totalEmotes = getAllEmoteEntryAmounts.reduce((amt, cur) => amt + cur.amount, 0)

      try {
        await Database.table('_leaderboards').insert({ user_id: id, total_emotes: totalEmotes })
      } catch (err) {
        await Database.from('_leaderboards').where({ user_id: id }).update({ total_emotes: totalEmotes })
      }
    }

    const allBattles = await Battle.all()

    await Database.from('_leaderboards_battles').delete()

    for (let index = 0; index < allBattles.length; index++) {
      const battle = allBattles[index]

      await battle.load('battleEntries')

      const winningBattleEntries = battle.winningBattleEntries

      for (let index = 0; index < battle.battleEntries.length; index++) {
        const battleEntry = battle.battleEntries[index]

        const id = battleEntry.userId

        const data: any = {
          user_id: id
        }

        if (winningBattleEntries.includes(battleEntry.id)) data.total_wins = 1
        else data.total_losses = 1

        try {
          await Database.table('_leaderboards_battles').insert(data)
        } catch (err) {
          delete data.user_id
          await Database.from('_leaderboards_battles').where({ user_id: id }).increment(data)
        }
      }
    }

    this.logger.info('[UpdateLeaderboards] Updated leaderboards.')
  }
}

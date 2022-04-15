import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import BattleStatisticAlgorithm from 'App/Models/BattleStatisticAlgorithm'

/**
 * Create default database values for battle_statistic_algorithms.
 */
export default class InitializeBattleStatisticAlgorithmsSeeder extends BaseSeeder {
  public async run (): Promise<void> {
    // Change this and add more statistics later. This is a placeholder.
    await BattleStatisticAlgorithm.create({
      statistic: 'Attack',
      func: {
        applyOn: 'init',
        cleanEval: "(userStatistic['Attack'].curValue / opponentStatistic['Defense'].curValue) + 2",
        applyEval: "opponentStatistic['Health'].curValue -= (userStatistic['Attack'].curValue / opponentStatistic['Defense'].curValue) + 2"
      },
      version: 0
    })
  }
}

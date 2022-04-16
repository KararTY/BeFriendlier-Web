/* eslint-disable @typescript-eslint/no-floating-promises */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class BattleStatisticAlgorithms extends BaseSchema {
  protected tableName = 'battle_statistic_algorithms'

  public async up (): Promise<void> {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('statistic').notNullable()

      table.json('func').notNullable()

      table.integer('version').defaultTo(0).notNullable()
    })
  }

  public async down (): Promise<void> {
    this.schema.dropTable(this.tableName)
  }
}

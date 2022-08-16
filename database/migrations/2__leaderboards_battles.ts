/* eslint-disable @typescript-eslint/no-floating-promises */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class _LeaderboardsSchema extends BaseSchema {
  protected tableName = '_leaderboards_battles'

  public async up (): Promise<void> {
    this.schema.createTable(this.tableName, table => {
      table.timestamps(true, true)
      table.integer('user_id').primary().references('users.id').onDelete('CASCADE')
      table.integer('total_wins').defaultTo(0).notNullable()
      table.integer('total_losses').defaultTo(0).notNullable()
    })
  }

  public async down (): Promise<void> {
    this.schema.dropTable(this.tableName)
  }
}

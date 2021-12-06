/* eslint-disable @typescript-eslint/no-floating-promises */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class _LeaderboardsSchema extends BaseSchema {
  protected tableName = '_leaderboards'

  public async up () {
    this.schema.createTable(this.tableName, table => {
      table.timestamps(true, true)
      table.integer('user_id').primary().references('users.id').onDelete('CASCADE')
      table.integer('total_emotes').defaultTo(0).notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

/* eslint-disable @typescript-eslint/no-floating-promises */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class BannedUsers extends BaseSchema {
  protected tableName = 'banned_users'

  public async up (): Promise<void> {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 32).notNullable()
      table.string('twitch_id', 32).unique().notNullable()
      table.timestamps(true)
    })
  }

  public async down (): Promise<void> {
    this.schema.dropTable(this.tableName)
  }
}

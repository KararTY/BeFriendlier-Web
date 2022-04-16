/* eslint-disable @typescript-eslint/no-floating-promises */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up (): Promise<void> {
    this.schema.alterTable(this.tableName, table => {
      table.boolean('streamer_mode').defaultTo(false)
    })
  }

  public async down (): Promise<void> {
    this.schema.alterTable(this.tableName, table => {
      table.dropColumn('streamer_mode')
    })
  }
}

/* eslint-disable @typescript-eslint/no-floating-promises */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.alterTable(this.tableName, table => {
      table.boolean('streamer_mode').defaultTo(false)
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, table => {
      table.dropColumn('streamer_mode')
    })
  }
}

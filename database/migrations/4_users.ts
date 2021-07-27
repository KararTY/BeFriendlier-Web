/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.alterTable(this.tableName, table => {
      table.json('emotes').defaultTo(JSON.stringify([]))
      table.integer('currency').defaultTo(0)
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, table => {
      table.dropColumn('emotes')
      table.dropColumn('currency')
    })
  }
}

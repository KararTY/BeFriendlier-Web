/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up (): Promise<void> {
    this.schema.alterTable(this.tableName, table => {
      table.json('emotes').defaultTo(JSON.stringify([]))
      table.integer('currency').defaultTo(0)
    })
  }

  public async down (): Promise<void> {
    this.schema.alterTable(this.tableName, table => {
      table.dropColumn('emotes')
      table.dropColumn('currency')
    })
  }
}

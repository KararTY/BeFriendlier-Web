/* eslint-disable @typescript-eslint/no-floating-promises */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.alterTable(this.tableName, table => {
      table.boolean('host').defaultTo(false).notNullable()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, table => {
      table.dropColumn('host')
    })
  }
}

/* eslint-disable @typescript-eslint/no-floating-promises */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Profiles extends BaseSchema {
  protected tableName = 'profiles'

  public async up (): Promise<void> {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('theme').defaultTo('white').notNullable()
    })
  }

  public async down (): Promise<void> {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('theme')
    })
  }
}

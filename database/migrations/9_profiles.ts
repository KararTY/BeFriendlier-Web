/* eslint-disable @typescript-eslint/no-floating-promises */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Profiles extends BaseSchema {
  protected tableName = 'profiles'

  public async up (): Promise<void> {
    this.schema.alterTable(this.tableName, (table) => {
      table.timestamp('next_battle', { useTz: true }).defaultTo(this.now())
      table.string('bio', 128).defaultTo('').notNullable().alter()
    })
  }

  public async down (): Promise<void> {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('next_battle')
      table.string('bio', 128).defaultTo('Hello!').notNullable().alter()
    })
  }
}

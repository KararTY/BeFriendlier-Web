/* eslint-disable @typescript-eslint/no-floating-promises */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Profiles extends BaseSchema {
  protected tableName = 'profiles'

  public async up (): Promise<void> {
    this.schema.alterTable(this.tableName, table => {
      table.timestamp('next_emote').defaultTo(this.now()).alter()
      table.timestamp('next_rolls').defaultTo(this.now()).alter()
    })
  }

  public async down (): Promise<void> {}
}

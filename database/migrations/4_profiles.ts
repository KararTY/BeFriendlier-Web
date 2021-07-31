/* eslint-disable @typescript-eslint/no-floating-promises */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Profiles extends BaseSchema {
  protected tableName = 'profiles'

  public async up () {
    this.schema.alterTable(this.tableName, table => {
      table.timestamp('next_emote').defaultTo(this.now())
      table.timestamp('next_rolls').defaultTo(this.now())
    })
  }

  public async down () {}
}

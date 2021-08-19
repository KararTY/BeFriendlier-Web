/* eslint-disable @typescript-eslint/no-floating-promises */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Emote extends BaseSchema {
  protected tableName = 'emotes'

  public async up () {
    this.schema.createTable(this.tableName, table => {
      table.string('id').primary().notNullable()
      table.string('name').notNullable()
    })
  }

  public down () {}
}

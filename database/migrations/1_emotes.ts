/* eslint-disable @typescript-eslint/no-floating-promises */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Emote extends BaseSchema {
  protected tableName = 'emotes'

  public async up (): Promise<void> {
    this.schema.createTable(this.tableName, table => {
      table.string('id').primary().notNullable()
      table.string('name').notNullable()
    })
  }

  public async down (): Promise<void> {
    this.schema.dropTable(this.tableName)
  }
}

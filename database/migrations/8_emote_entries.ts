/* eslint-disable @typescript-eslint/no-floating-promises */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EmoteEntries extends BaseSchema {
  protected tableName = 'emote_entries'

  public async up (): Promise<void> {
    this.schema.alterTable(this.tableName, table => {
      table.string('emote_recipe').references('emote_recipes.id')
      table.string('seed')
    })
  }

  public async down (): Promise<void> {
    this.schema.alterTable(this.tableName, table => {
      table.dropColumn('seed')
      table.dropColumn('emote_recipe')
    })
  }
}

/* eslint-disable @typescript-eslint/no-floating-promises */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EmoteAliases extends BaseSchema {
  protected tableName = 'emote_aliases'

  public async up (): Promise<void> {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.string('origin_emote_id').references('emotes.id').notNullable()
      table.string('alias_emote_id').notNullable()
    })
  }

  public async down (): Promise<void> {
    this.schema.dropTable(this.tableName)
  }
}

/* eslint-disable @typescript-eslint/no-floating-promises */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EmoteRecipes extends BaseSchema {
  protected tableName = 'emote_recipes'

  public async up (): Promise<void> {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.json('combo').defaultTo(JSON.stringify([])).notNullable()
      table.json('images').defaultTo(JSON.stringify([])).notNullable()
    })
  }

  public async down (): Promise<void> {
    this.schema.dropTable(this.tableName)
  }
}

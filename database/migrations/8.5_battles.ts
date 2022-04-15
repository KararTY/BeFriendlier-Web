/* eslint-disable @typescript-eslint/no-floating-promises */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EmoteEntries extends BaseSchema {
  protected tableName = 'battles'

  public async up (): Promise<void> {
    this.schema.createTable(this.tableName, table => {
      table.string('id').primary() // This is the yeast seed for the battle.

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.json('battle_entries').defaultTo([]).notNullable()

      table.json('winning_battle_entries').defaultTo([]).notNullable()
    })
  }

  public async down (): Promise<void> {
    this.schema.dropTable(this.tableName)
  }
}

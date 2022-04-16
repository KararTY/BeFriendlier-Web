/* eslint-disable @typescript-eslint/no-floating-promises */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class BattleEntries extends BaseSchema {
  protected tableName = 'battle_entries'

  public async up (): Promise<void> {
    this.schema.createTable(this.tableName, table => {
      table.increments('id').primary()

      table.timestamps(false)

      table.string('battle_id').references('battles.id')

      table.integer('user_id').references('users.id')

      table.json('battle_emote').defaultTo(JSON.stringify({})).notNullable()
    })
  }

  public async down (): Promise<void> {
    this.schema.dropTable(this.tableName)
  }
}

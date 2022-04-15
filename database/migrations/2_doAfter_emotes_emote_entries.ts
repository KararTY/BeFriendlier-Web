/* eslint-disable @typescript-eslint/no-floating-promises */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class EmoteEntry extends BaseSchema {
  protected tableName = 'emote_entries'

  public async up (): Promise<void> {
    this.schema.createTable(this.tableName, table => {
      table.increments('id').primary()
      table.integer('user_id').notNullable().references('users.id').onDelete('CASCADE')
      table.integer('amount').defaultTo(1).notNullable()
      table.json('statistics').defaultTo(JSON.stringify([])).notNullable()
      table.string('emote_id').notNullable().references('emotes.id')
      table.boolean('is_battle').defaultTo(false).notNullable()
      table.boolean('is_combinable').defaultTo(true).notNullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down (): Promise<void> {
    this.schema.dropTable(this.tableName)
  }
}

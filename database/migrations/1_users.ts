/* eslint-disable @typescript-eslint/no-floating-promises */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up (): Promise<void> {
    this.schema.createTable(this.tableName, table => {
      table.increments('id').primary()
      table.string('password', 1).nullable()
      table.string('remember_me_token').nullable()
      table.string('avatar', 128).notNullable()
      table.json('profiles').defaultTo(JSON.stringify([]))
      table.string('name', 32).notNullable()
      table.string('display_name', 32).notNullable()
      table.string('twitch_id', 32).unique().notNullable()
      table.boolean('premium').defaultTo(false)
      table.integer('premium_tier').defaultTo(0)
      table.date('premium_next_payment').nullable()
      table.json('favorite_streamers').defaultTo(JSON.stringify([])).notNullable()
      table.timestamps(true)
    })
  }

  public async down (): Promise<void> {
    this.schema.dropTable(this.tableName)
  }
}

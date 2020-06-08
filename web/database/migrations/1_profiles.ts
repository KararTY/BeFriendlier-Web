/* eslint-disable @typescript-eslint/no-floating-promises */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Profiles extends BaseSchema {
  protected tableName = 'profiles'

  public async up () {
    this.schema.createTable(this.tableName, table => {
      table.increments('id')
      table.integer('user_id').notNullable()
      table.string('chat_id', 32)
      table.boolean('global').defaultTo(false)
      table.boolean('enabled').defaultTo(true)
      table.json('favorite_emotes').defaultTo(JSON.stringify([])).notNullable()
      table.string('bio', 128).defaultTo('Hello!').notNullable()
      table.string('color', 11).defaultTo('255-255-255').notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

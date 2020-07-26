/* eslint-disable @typescript-eslint/no-floating-promises */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Profiles extends BaseSchema {
  protected tableName = 'profiles'

  public async up () {
    this.schema.createTable(this.tableName, table => {
      table.increments('id')
      table.integer('user_id').notNullable()
      table.integer('chat_user_id').notNullable()
      table.boolean('enabled').defaultTo(true)
      table.json('favorite_emotes').defaultTo(JSON.stringify([])).notNullable()
      table.json('matches').defaultTo(JSON.stringify([])).notNullable()
      table.string('bio', 128).defaultTo('Hello!').notNullable()
      table.string('color', 7).defaultTo('#ffffff').notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

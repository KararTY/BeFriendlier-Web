/* eslint-disable @typescript-eslint/no-floating-promises */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { DateTime } from 'luxon'

export default class FavoriteStreamerLists extends BaseSchema {
  protected tableName = 'favorite_streamer_lists'

  public async up (): Promise<void> {
    this.schema.createTable(this.tableName, table => {
      table.integer('user_id')
      table.integer('streamer_id')
      table.dateTime('created_at').defaultTo(DateTime.fromJSDate(new Date()).toSQL())
      table.dateTime('updated_at').defaultTo(DateTime.fromJSDate(new Date()).toSQL())
    })
  }

  public async down (): Promise<void> {
    this.schema.dropTable(this.tableName)
  }
}

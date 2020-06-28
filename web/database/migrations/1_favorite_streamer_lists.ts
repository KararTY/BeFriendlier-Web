/* eslint-disable @typescript-eslint/no-floating-promises */
import { DateTime } from 'luxon'
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class FavoriteStreamerLists extends BaseSchema {
  protected tableName = 'favorite_streamer_lists'

  public async up () {
    this.schema.createTable(this.tableName, table => {
      table.integer('user_id')
      table.integer('streamer_id')
      table.dateTime('created_at').defaultTo(DateTime.fromJSDate(new Date()).toFormat('yyyy-MM-dd HH:mm:ss'))
      table.dateTime('updated_at').defaultTo(DateTime.fromJSDate(new Date()).toFormat('yyyy-MM-dd HH:mm:ss'))
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

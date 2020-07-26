/* eslint-disable @typescript-eslint/no-floating-promises */
import { DateTime } from 'luxon'
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class MatchesLists extends BaseSchema {
  protected tableName = 'matches_lists'

  public async up () {
    this.schema.createTable(this.tableName, table => {
      table.integer('profile_id')
      table.integer('user_id')
      table.integer('match_profile_id')
      table.integer('match_user_id')
      table.dateTime('created_at').defaultTo(DateTime.fromJSDate(new Date()).toSQL())
      table.dateTime('updated_at').defaultTo(DateTime.fromJSDate(new Date()).toSQL())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

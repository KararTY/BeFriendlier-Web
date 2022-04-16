/* eslint-disable @typescript-eslint/no-floating-promises */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { DateTime } from 'luxon'

export default class Profiles extends BaseSchema {
  protected tableName = 'profiles'

  public async up (): Promise<void> {
    this.schema.alterTable(this.tableName, table => {
      table.timestamp('next_emote').defaultTo(DateTime.fromJSDate(new Date()).toSQL())
    })
  }

  public async down (): Promise<void> {
    this.schema.alterTable(this.tableName, table => {
      table.dropColumn('next_emote')
    })
  }
}

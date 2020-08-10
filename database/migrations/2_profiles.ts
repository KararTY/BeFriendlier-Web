/* eslint-disable @typescript-eslint/no-floating-promises */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { DateTime } from 'luxon'

export default class Profiles extends BaseSchema {
  protected tableName = 'profiles'

  public async up () {
    this.schema.alterTable(this.tableName, table => {
      table.json('mismatches').defaultTo(JSON.stringify([])).notNullable()
      table.json('rolls').defaultTo(JSON.stringify([])).notNullable()
      table.timestamp('next_rolls').defaultTo(DateTime.fromJSDate(new Date()).toSQL())
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, table => {
      table.dropColumn('mismatches')
      table.dropColumn('rolls')
      table.dropColumn('next_rolls')
    })
  }
}

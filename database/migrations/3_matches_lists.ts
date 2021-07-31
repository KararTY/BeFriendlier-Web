/* eslint-disable @typescript-eslint/no-floating-promises */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class MatchesLists extends BaseSchema {
  protected tableName = 'matches_lists'

  public async up () {
    this.schema.alterTable(this.tableName, table => {
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now()).alter()
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now()).alter()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, table => {
      table.dropTimestamps()
    })
  }
}

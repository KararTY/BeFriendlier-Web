/* eslint-disable @typescript-eslint/no-floating-promises */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class MatchesLists extends BaseSchema {
  protected tableName = 'matches_lists'

  public async up () {
    this.schema.alterTable(this.tableName, table => {
      table.dropColumn('created_at')
      table.dropColumn('updated_at')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, table => {
      table.dropTimestamps()
    })
  }
}

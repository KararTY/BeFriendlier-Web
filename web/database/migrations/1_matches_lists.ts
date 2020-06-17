/* eslint-disable @typescript-eslint/no-floating-promises */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class MatchesLists extends BaseSchema {
  protected tableName = 'matches_lists'

  public async up () {
    this.schema.createTable(this.tableName, table => {
      table.integer('user_id')
      table.integer('match_id')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

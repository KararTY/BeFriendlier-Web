/* eslint-disable @typescript-eslint/no-floating-promises */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class FavoriteStreamerLists extends BaseSchema {
  protected tableName = 'favorite_streamer_lists'

  public async up (): Promise<void> {
    this.schema.alterTable(this.tableName, table => {
      table.timestamp('created_at', { useTz: true }).defaultTo(null).alter()
      table.timestamp('updated_at', { useTz: true }).defaultTo(null).alter()
    })
  }

  public async down (): Promise<void> {
    this.schema.alterTable(this.tableName, table => {
      table.dropTimestamps()
    })
  }
}

/* eslint-disable @typescript-eslint/no-floating-promises */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Emotes extends BaseSchema {
  protected tableName = 'emotes'

  public async up (): Promise<void> {
    this.schema.alterTable(this.tableName, table => {
      table.timestamp('created_at', { useTz: true }).defaultTo(null)
      table.timestamp('updated_at', { useTz: true }).defaultTo(null)
    })
  }

  public async down (): Promise<void> {
    this.schema.alterTable(this.tableName, table => {
      table.dropTimestamps()
    })
  }
}

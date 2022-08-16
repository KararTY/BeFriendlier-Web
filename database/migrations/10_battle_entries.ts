/* eslint-disable @typescript-eslint/no-floating-promises */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class BattleEntries extends BaseSchema {
  protected tableName = 'battle_entries'

  public async up (): Promise<void> {
    this.schema.alterTable(this.tableName, table => {
      table.dropForeign('battle_id')

      table.foreign('battle_id').references('battles.id').onDelete('CASCADE')
    })
  }

  public async down (): Promise<void> {
    this.schema.alterTable(this.tableName, table => {
      table.dropForeign('battle_id')

      table.foreign('battle_id').references('battles.id').onDelete('NO ACTION')
    })
  }
}

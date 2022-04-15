import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import BattleEntry from './BattleEntry'

export default class Battle extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @hasMany(() => BattleEntry)
  public battleEntries: HasMany<typeof BattleEntry>

  @column({
    prepare: (value: number[]) => JSON.stringify(value),
    consume: (value: any) => {
      if (typeof value === 'string') {
        return JSON.parse(value)
      } else {
        return value
      }
    }
  })
  public winningBattleEntries: number[]

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

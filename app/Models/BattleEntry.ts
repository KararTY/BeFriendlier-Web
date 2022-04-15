import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Battle from './Battle'
import { Data } from './EmoteEntry'
import User from './User'

export interface EmoteBattleEntry {
  emote_id: string
  seed: string
  emote_recipe: string
  statistics: Data[]
}

export default class BattleEntry extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column({ columnName: 'user_id' })
  public userId: number

  @belongsTo(() => Battle)
  public battle: BelongsTo<typeof Battle>

  @column({ columnName: 'battle_id' })
  public battleId: string

  @column({
    prepare: (value: EmoteBattleEntry) => JSON.stringify(value),
    consume: (value: string | any) => {
      if (typeof value === 'string') {
        return JSON.parse(value)
      } else {
        return value
      }
    }
  })
  public battleEmote: EmoteBattleEntry

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

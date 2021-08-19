import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class EmoteEntry extends BaseModel {
  public static table = 'emote_entries'

  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public amount: number

  @column()
  public emoteId: string

  @column()
  public isBattle: boolean

  @column()
  public isCombinable: boolean

  @column()
  public statistics: number[]

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

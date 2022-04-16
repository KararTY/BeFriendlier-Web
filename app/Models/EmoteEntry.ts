import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export interface Data {
  name: string
  type: string
  percentage?: number
  defValue?: number
  addValue?: number
  curValue: number
}
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

  @column({
    prepare: (value: Data[]) => JSON.stringify(value),
    consume: (value: any) => {
      if (typeof value === 'string') {
        return JSON.parse(value)
      } else {
        return value
      }
    }
  })
  public statistics: Data[]

  @column()
  public emoteRecipe: string

  @column()
  public seed: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

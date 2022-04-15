import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export interface Image {
  author: string
  name: string
  localUrl: string
}

export default class EmoteRecipe extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column({
    prepare: (value: number[]) => JSON.stringify(value),
    consume: (value: number | any) => {
      if (typeof value === 'string') {
        return JSON.parse(value)
      } else {
        return value
      }
    }
  })
  public combo: string[]

  @column({
    prepare: (value: Image[]) => JSON.stringify(value),
    consume: (value: Image | any) => {
      if (typeof value === 'string') {
        return JSON.parse(value)
      } else {
        return value
      }
    }
  })
  public images: Image[]
}

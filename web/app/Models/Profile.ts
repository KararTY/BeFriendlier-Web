import { DateTime } from 'luxon'

import {
  column,
  BaseModel,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'

import User from 'App/Models/User'

interface Color {
  r: string
  g: string
  b: string
}

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  // Foreign key
  @column()
  public userId: number

  @column()
  public chatId?: number

  @column()
  public global: boolean

  @column()
  public enabled: boolean

  @column()
  public bio: string

  @column({
    serialize: (value: string): Color => {
      const valueArr = value.split('-')
      return {
        r: valueArr[0],
        g: valueArr[1],
        b: valueArr[2],
      }
    },
  })
  public color: string

  @column({
    prepare: (value: string[]) => JSON.stringify(value),
    serialize: (value: string) => JSON.parse(value),
  })
  public favoriteEmotes: string[]

  @manyToMany(() => User, {
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'match_id',
    pivotTable: 'matches_lists',
  })
  public matches: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

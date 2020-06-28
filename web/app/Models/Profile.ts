import { DateTime } from 'luxon'

import {
  column,
  BaseModel,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  // Foreign key
  @column()
  public userId: number

  @column()
  public chatUserId?: number

  @column()
  public enabled: boolean

  @column()
  public bio: string

  @column()
  public color: string

  @column({
    prepare: (value: string[]) => JSON.stringify(value),
    serialize: (value: string) => JSON.parse(value),
  })
  public favoriteEmotes: string[]

  @manyToMany(() => Profile, {
    localKey: 'id',
    pivotForeignKey: 'profile_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'match_profile_id',
    pivotTable: 'matches_lists',
    pivotColumns: ['user_id', 'match_user_id'],
  })
  public matches: ManyToMany<typeof Profile>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

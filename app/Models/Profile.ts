import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import { Emote } from 'befriendlier-shared'

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  // Foreign key
  @column()
  public userId: number

  @column()
  public chatUserId: number

  @column()
  public enabled: boolean

  @column()
  public bio: string

  @column()
  public color: string

  @column({
    prepare: (value: Emote[]) => JSON.stringify(value),
    consume: (value: string | any) => {
      if (typeof value === 'string') {
        return JSON.parse(value)
      } else {
        return value
      }
    },
  })
  public favoriteEmotes: Emote[]

  @manyToMany(() => Profile, {
    localKey: 'id',
    pivotForeignKey: 'profile_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'match_profile_id',
    pivotTable: 'matches_lists',
    pivotColumns: ['user_id', 'match_user_id'],
  })
  public matches: ManyToMany<typeof Profile>

  @column({
    prepare: (value: number[]) => JSON.stringify(value),
    consume: (value: string | any) => {
      if (typeof value === 'string') {
        return JSON.parse(value)
      } else {
        return value
      }
    },
  })
  public mismatches: number[]

  @column({
    prepare: (value: number[]) => JSON.stringify(value),
    consume: (value: string | any) => {
      if (typeof value === 'string') {
        return JSON.parse(value)
      } else {
        return value
      }
    },
  })
  public rolls: number[]

  @column.dateTime()
  public nextRolls: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

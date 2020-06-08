import { DateTime } from 'luxon'

import {
  column,
  BaseModel,
  hasMany,
  HasMany,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'

import Profile from 'App/Models/Profile'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({
    serialize: () => 'HIDDEN',
  })
  public password: string

  @column({
    serialize: () => 'HIDDEN',
  })
  public rememberMeToken: string

  @column()
  public avatar: string

  @column()
  public name: string

  @hasMany(() => Profile)
  public profile: HasMany<typeof Profile>

  @column()
  public displayName: string

  @column({ columnName: 'twitch_id' })
  public twitchID: string

  @manyToMany(() => User, {
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'streamer_id',
    pivotTable: 'favorite_streamer_lists',
  })
  public favoriteStreamers: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

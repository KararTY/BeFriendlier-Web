import { BaseModel, column, hasMany, HasMany, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Profile from 'App/Models/Profile'
import { DateTime } from 'luxon'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: null })
  public password: string

  @column({ serializeAs: null })
  public rememberMeToken: string

  @column()
  public avatar: string

  @column()
  public name: string

  @column()
  public displayName: string

  @hasMany(() => Profile)
  public profile: HasMany<typeof Profile>

  @column({ columnName: 'twitch_id' })
  public twitchID: string

  @manyToMany(() => User, {
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'streamer_id',
    pivotTable: 'favorite_streamer_lists',
    serializeAs: 'favorite_streamers',
  })
  public favoriteStreamers: ManyToMany<typeof User>

  @column()
  public streamerMode: boolean

  @column()
  public host: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

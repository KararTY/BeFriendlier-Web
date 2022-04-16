import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class EmoteAlias extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public originEmoteId: string

  @column()
  public aliasEmoteId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

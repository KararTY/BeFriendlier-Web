/* eslint-disable @typescript-eslint/no-floating-promises */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { NameAndId } from 'befriendlier-shared'
// import { Emote as BotEmote } from 'befriendlier-shared'

const emotesTableName = 'emotes'
const emotesEntriesTableName = 'emote_entries'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up (): Promise<void> {
    this.defer(async () => {
      const res = await this.db.from(this.tableName).select(['id', 'emotes'])

      for (let index = 0; index < res.length; index++) {
        const { id, emotes } = res[index]

        const emotesToInsert: any[] = []
        for (let ii = 0; ii < emotes.length; ii++) {
          const emote = emotes[ii]

          let existsEmote = await this.db.from(emotesTableName).where({ id: emote.id }).first() as NameAndId

          if (existsEmote == null) {
            existsEmote = {
              id: emote.id,
              name: emote.name
            }

            await this.db.insertQuery().table(emotesTableName).insert(existsEmote)
          }

          emotesToInsert.push({
            user_id: id,
            emote_id: existsEmote.id,
            amount: emote?.amount ?? 1,
            is_battle: false,
            is_combinable: true,
            statistics: JSON.stringify([])
          })
        }

        if (emotesToInsert.length > 0) {
          await this.db.insertQuery().table(emotesEntriesTableName).multiInsert(emotesToInsert)
        }
      }
    })
  }

  public async down (): Promise<void> {}
}

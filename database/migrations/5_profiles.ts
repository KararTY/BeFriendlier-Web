/* eslint-disable @typescript-eslint/no-floating-promises */
import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { NameAndId } from 'befriendlier-shared'

export default class Profiles extends BaseSchema {
  protected tableName = 'profiles'

  public async up () {
    this.defer(async () => {
      const res = await this.db.from(this.tableName).select(['id','favorite_emotes'])

      for (let index = 0; index < res.length; index++) {
        const entry = res[index]

        for (let ii = 0; ii < entry.favorite_emotes.length; ii++) {
          const emote = entry.favorite_emotes[ii]

          let existsEmote = await this.db.from('emotes').where({ id: emote.id }).first() as NameAndId

          if (!existsEmote) {
            existsEmote = {
              id: emote.id,
              name: emote.name
            }

            await this.db.insertQuery().table('emotes').insert(existsEmote)
          }

          entry.favorite_emotes[ii] = existsEmote.id
        }

        await this.db.from(this.tableName).where({ id: entry.id }).update({ favorite_emotes: JSON.stringify(entry.favorite_emotes) })
      }
    })
  }

  public down () {}
}

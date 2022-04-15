import faker from '@faker-js/faker'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { ModelObject } from '@ioc:Adonis/Lucid/Orm'
import battle from '@ioc:Befriendlier-Battle'
import Emote from 'App/Models/Emote'
import EmoteAlias from 'App/Models/EmoteAlias'
import EmoteEntry, { Data } from 'App/Models/EmoteEntry'
import EmoteRecipe, { Image } from 'App/Models/EmoteRecipe'
import User from 'App/Models/User'
import { durstenfeldShuffle } from 'App/Services/Handlers/Helpers'
import sjp from 'secure-json-parse'

interface BattleEmoteEntry {
  userId?: number
  isBattle: boolean
  isCombinable: boolean
  seed: string
  emoteRecipe: string
  emoteId: string
  statistics: any
}

export default class EmotesController {
  public async read ({ auth, view }: HttpContextContract): Promise<string | undefined> {
    if (auth.user === undefined) {
      return
    }

    await auth.user.load('emotes')

    const allEmotes = auth.user.emotes
    const emotes: ModelObject[] = []
    const battleEmotes: ModelObject[] = []
    const foundRecipes: any = {}

    for (let index = 0; index < allEmotes.length; index++) {
      if (allEmotes[index].seed !== null) {
        const recipe = await EmoteRecipe.find(allEmotes[index].emoteRecipe) as EmoteRecipe
        battleEmotes.push({ ...allEmotes[index].serialize(), image: recipe.images[Number(allEmotes[index].seed)], recipeId: recipe.id })
        const aliasesToEmoteIds = await this.aliasesToEmoteIds(recipe.combo)

        foundRecipes[recipe.images[0].name] = aliasesToEmoteIds
      } else {
        emotes.push({ ...(await Emote.find(allEmotes[index].emoteId))?.serialize(), ...allEmotes[index].serialize() })
      }
    }

    const totalEmotes = allEmotes.reduce((acc, cur) => acc + (cur.amount ?? 0), 0)

    return await view.render('core', {
      user: auth.user,
      web: {
        template: 'emotes',
        title: `User emotes - ${auth.user.displayName}`,
        emotes,
        foundRecipes,
        battleEmotes,
        totalEmotes
      }
    })
  }

  /**
   * NOTE: THIS IS A POST REQUEST.
   */
  public async combineEmotes ({ auth, request, response }: HttpContextContract): Promise<undefined | { image: Image }> {
    if (auth.user === undefined) {
      return
    }

    // TODO: Add wildcard_emotes
    const { emotesToCombine: emotesToCombineString } = request.body()

    // Array of EmoteEntry ids.
    const emotesToCombine = sjp.parse(emotesToCombineString, null, { protoAction: 'remove' }) as string[]

    await auth.user.load('emotes')

    // Use the existing emotes.
    const existingEmotes = this.existingEmotes(emotesToCombine, auth.user.emotes)

    if (existingEmotes.length === 0) return response.forbidden({ error: 'You don\'t have those emotes, tough luck.' }) as undefined

    // Emotes Aliases
    let recipe: any[] = []
    for (let index = 0; index < existingEmotes.length; index++) {
      const ee = existingEmotes[index]

      const emoteAlias = await EmoteAlias.findBy('originEmoteId', ee.emoteId)
      if (emoteAlias != null) {
        recipe.push(emoteAlias.aliasEmoteId)
      } else {
        return response.badRequest({ error: 'Not a valid recipe... Unlucky, 🦆 rubber ducky.' }) as undefined
      }
    }

    // Sort existingEmotes by ascending emoteId, because recipes are ordered by (localized) ascending emoteId.
    recipe = battle.sortEmoteEntryArray(recipe.map(i => { return { emoteId: i } }))

    const recipeMatch: EmoteRecipe | undefined = (await Database.rawQuery(`SELECT * FROM emote_recipes WHERE CAST ( "combo" AS TEXT ) = '${JSON.stringify(recipe.map(r => r.emoteId))}';`)).rows[0]

    if (recipeMatch === undefined) return response.badRequest({ error: 'Not a valid recipe. Unlucky, 🦆 rubber ducky.' }) as undefined

    await this.deleteEmotes(existingEmotes)

    const variationsCount = recipeMatch.images.length
    const seed = this.rollSeed(variationsCount)
    const statistics = this.rollStatistics(seed, variationsCount)

    const battleEmoteEntry = this.battleEmoteEntry(seed.toString(), recipeMatch, statistics)

    // Avoid type-checking. This may, or may not be set by the related() function below.
    battleEmoteEntry.userId = auth.user.id

    const emote = await auth.user.related('emotes').create(battleEmoteEntry)

    return this.battleEmoteJSON(emote, recipeMatch)
  }

  /**
   * NOTE: THIS IS A POST REQUEST.
   */
  public async resignBattleEmote ({ auth, request, response }: HttpContextContract): Promise<undefined | ModelObject> {
    if (auth.user === undefined) {
      return
    }

    const { battleEmoteToResign: battleEmoteToResignString } = request.body()

    await auth.user.load('emotes')

    const battleEmoteToResign = auth.user.emotes.find(e => e.id === Number(battleEmoteToResignString))

    if (battleEmoteToResign == null) return response.forbidden({ error: 'You don\'t have or own that battle emote, tough luck.' }) as undefined

    const recipe = await EmoteRecipe.find(battleEmoteToResign.emoteRecipe)

    if (recipe == null) return response.notFound({ error: 'Can\'t delete the battle emote, somehow that recipe doesn\'t exist.' }) as undefined

    const emotesToRoll = (await this.aliasesToEmoteIds(recipe.combo)).flat()

    // Mutating in place.
    durstenfeldShuffle(emotesToRoll)

    const id = emotesToRoll[0]

    await this.deleteEmotes([battleEmoteToResign])

    await this.giveEmote(auth.user, id)

    const emote = await Emote.find(id)

    return emote?.serialize({ fields: ['id', 'name'] })
  }

  private async giveEmote (user: User, id: string): Promise<void> {
    const existingUserEmote = user.emotes.find(ee => ee.emoteId === id)

    if (existingUserEmote == null) {
      await user.related('emotes').create({
        emoteId: id,
        amount: 1
      })
    } else {
      // Add one emote.
      existingUserEmote.amount += 1
      await user.related('emotes').save(existingUserEmote)
    }
  }

  private async aliasesToEmoteIds (aliases: string[]): Promise<string[][]> {
    const emotes: string[][] = []

    for (let index = 0; index < aliases.length; index++) {
      const alias = await EmoteAlias.query().where('aliasEmoteId', aliases[index])

      if (alias !== null) emotes.push(alias.map(a => a.originEmoteId))
    }

    return emotes
  }

  private existingEmotes (emotesToFind: string[], userEmotes: EmoteEntry[]): EmoteEntry[] {
    const existingEmotes: EmoteEntry[] = []

    for (let index = 0; index < emotesToFind.length; index++) {
      const emoteId = emotesToFind[index]

      const emote = userEmotes.find(e => e.emoteId === emoteId)
      if (emote?.isCombinable !== undefined) existingEmotes.push(emote)
    }

    return existingEmotes
  }

  private async deleteEmotes (emotes: EmoteEntry[]): Promise<void> {
    for (let index = 0; index < emotes.length; index++) {
      const emote = emotes[index]

      emote.amount -= 1

      if (emote.amount === 0) {
        await emote.delete()
        continue
      }

      await emote.save()
    }
  }

  private rollSeed (variationsCount: number): number {
    let seed = 0

    const rng = faker.datatype.number({ min: 0, max: 100 })

    if (variationsCount > 1) {
      if (rng >= 95 && variationsCount > 3) seed = faker.datatype.number({ min: 3, max: variationsCount - 1 })
      else if (rng >= 90 && variationsCount > 2) seed = 2
      else if (rng >= 70) seed = 1
    }

    return seed
  }

  private rollStatistics (seed: number, variationsCount: number): Data[] {
    const statistics: Data[] = []
    statistics.push(...battle.defaultStatistics)

    if (seed > 0) {
      const index = Number(battle.mapRange(seed, 1, variationsCount, 0, battle.namedDefaultStatisticsNames.length))
      const statistic = {
        name: battle.namedDefaultStatisticsNames[index],
        ...battle.namedDefaultStatisticsDefaults
      }
      statistics.push(statistic)
    }

    return statistics
  }

  private battleEmoteEntry (seed: string, recipe: EmoteRecipe, statistics: Data[]): BattleEmoteEntry {
    return {
      isBattle: true,
      isCombinable: false,
      seed,
      emoteRecipe: recipe.id,
      emoteId: '0',
      statistics
    }
  }

  private battleEmoteJSON (emote: EmoteEntry, recipe: EmoteRecipe): { image: Image } {
    return { ...emote.serialize(), image: recipe.images[Number(emote.seed)] }
  }
}

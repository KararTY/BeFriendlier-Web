
import BattleStatic from '@ioc:Befriendlier-Battle'
import Battle from 'App/Models/Battle'
import BattleEntry, { EmoteBattleEntry } from 'App/Models/BattleEntry'
import BattleStatisticAlgorithm from 'App/Models/BattleStatisticAlgorithm'
import EmoteEntry, { Data } from 'App/Models/EmoteEntry'
import Profile from 'App/Models/Profile'
import User from 'App/Models/User'
import { BATTLE, MessageType } from 'befriendlier-shared'
import { DateTime } from 'luxon'
import vm from 'vm'
import yeast from 'yeast'
import { ExtendedWebSocket, ResSchema } from '../../Ws'
import DefaultHandler from '../DefaultHandler'
import Emotes from '../Emotes'
import Helper, { durstenfeldShuffle, Helper as HelperStatic } from '../Helpers'

interface Statistics {
  [key: string]: {
    name: string
    type: string
    percentage: number
    defValue: number
    addValue: number
    curValue: number
  }
}

export default class BattleHandler extends DefaultHandler {
  public messageType = MessageType.BATTLE

  private readonly maxTurns = 20

  public async onClientResponse (socket: ExtendedWebSocket, res: ResSchema): Promise<void> {
    // TODO: Should we raise an error?
    if (res.data === undefined) return

    const data: BATTLE = JSON.parse(res.data)

    const { profile: thisUserProfile } = await Helper.findProfileOrCreateByChatOwner(data.userTwitch, data.channelTwitch, data.global)

    if (thisUserProfile.nextBattle.diffNow('hours').hours >= 0) {
      socket.send(this.ws.socketMessage(MessageType.WHISPER, JSON.stringify({
        ...data,
        result: {
          value: `(#${data.channelTwitch.name} | ${HelperStatic.profileType(data.global)}): Try battling again ${HelperStatic.diffDate(thisUserProfile.nextBattle)}.`
        }
      })))

      throw Helper.error(MessageType.TAKEABREAK, data.userTwitch, data.channelTwitch, 'looks like you\'ve already had a fight in this channel, 🦆 rubber ducky.')
    }

    // Check if this user exists...
    const thisUser = await Helper.findUserByTwitchID(data.userTwitch.id)
    if (thisUser == null) {
      socket.send(this.ws.socketMessage(MessageType.UNREGISTERED, JSON.stringify(data)))
      return
    }

    // ... and has battle emotes.
    let thisUserBattleEmotes = await BattleHandler.getBattleEmotes(thisUser)
    if (thisUserBattleEmotes.length === 0) {
      this.sendBattleMessage(socket, data, "you don't have any battle emotes! Combine some on the website!")
      return
    }

    // Are some still alive?
    thisUserBattleEmotes = thisUserBattleEmotes.filter(emote => this.battleEmoteStillAlive(emote))
    if (thisUserBattleEmotes.length === 0) {
      this.sendBattleMessage(socket, data, "you don't have any living battle emotes! Looking for friends is healing.")
      return
    }

    // Check if targetUser exists...
    const targetUser = await Helper.findUserByTwitchID(data.targetUserTwitch.id)
    if (targetUser == null) {
      this.sendBattleMessage(socket, data, "couldn't find the opponent. Double check the spelling.")
      return
    }

    // ... as a match in any of this user's profiles.
    await thisUser.load('profile')
    const foundProfile = await this.matchedWithUser(thisUser, targetUser)
    if (!foundProfile) {
      this.sendBattleMessage(socket, data, "can't battle them. You've not matched with this opponent in any of your profiles.")
      return
    }

    // and has battle emotes.
    let targetUserBattleEmotes = await BattleHandler.getBattleEmotes(targetUser)
    if (targetUserBattleEmotes.length === 0) {
      this.sendBattleMessage(socket, data, "opponent doesn't have any battle emotes! Tell them to combine some.")
      return
    }

    // Are some still alive?
    targetUserBattleEmotes = targetUserBattleEmotes.filter(emote => this.battleEmoteStillAlive(emote))
    if (targetUserBattleEmotes.length === 0) {
      this.sendBattleMessage(socket, data, "opponent doesn't have any remaining healthy battle emotes!")
      return
    }

    thisUserBattleEmotes = await this.sortBattleEmotes(thisUserBattleEmotes)
    targetUserBattleEmotes = await this.sortBattleEmotes(targetUserBattleEmotes)

    await this.createBattle({
      user: { profile: thisUserProfile, model: thisUser, battleEmote: thisUserBattleEmotes[0] },
      opponent: { model: targetUser, battleEmote: targetUserBattleEmotes[0] }
    }, socket, data)

    // Ratelimit profile's battles to next hour.
    thisUserProfile.nextBattle = DateTime.fromJSDate(new Date()).plus({ hour: 1 })

    await thisUserProfile.save()
  }

  public static async getBattleEmotes (user: User): Promise<EmoteEntry[]> {
    await user.load('emotes')

    return user.emotes.filter(emote => emote.isBattle)
  }

  public battleEmoteStillAlive (emote: EmoteEntry): boolean {
    const healthStatistic = emote.statistics.find(statistic => statistic.name === 'Health') as Data

    return healthStatistic.curValue > 0
  }

  public async sortBattleEmotes (emotes: EmoteEntry[]): Promise<EmoteEntry[]> {
    // TODO: This can be removed later.
    // for (let index = 0; index < emotes.length; index++) {
    //  const emote = emotes[index]
    //
    //  const orderDataA: Data | undefined = emote.statistics.find(statistic => statistic.name === 'Order')
    //
    //  if (!orderDataA) {
    //    const defaultStatistic = battle.defaultStatistics.find(statistic => statistic.name === 'Order') as Data
    //    emote.statistics.push(defaultStatistic)
    //    // await emote.save()
    //  }
    // }

    durstenfeldShuffle(emotes)

    return emotes.sort((a, b) => {
      const orderDataA = a.statistics.find(statistic => statistic.name === 'Order') as Data
      const orderDataB = b.statistics.find(statistic => statistic.name === 'Order') as Data

      // curValue = 0 is for allowing durstenfeld to work.
      return (orderDataA.curValue ?? -1) - (orderDataB.curValue ?? -1)
    })
  }

  public async matchedWithUser (thisUser: User, targetUser: User): Promise<boolean> {
    for (let index = 0; index < thisUser.profile.length; index++) {
      const profile = thisUser.profile[index]

      await profile.load('matches')

      const bool = profile.matches.some(match => match.userId === targetUser.id)

      if (bool) {
        return true
      }
    }

    return false
  }

  public async createBattle (
    { user, opponent }: { user: { profile: Profile, model: User, battleEmote: EmoteEntry }, opponent: { model: User, battleEmote: EmoteEntry } },
    socket: ExtendedWebSocket,
    data: BATTLE
  ): Promise<void> {
    const serializationCherryPick = { fields: ['emote_id', 'seed', 'emote_recipe', 'statistics'] }

    /**
      * CREATE BATTLE:
      * Generate a yeast
      * CREATE individual entries for battle emotes in battle_entries, fill battle_emotes, user_id and battle_id with yeast.
      * CREATE entry in battles, fill id with yeast and battle_entries.
      */

    const battle = await Battle.create({
      id: yeast(),
      winningBattleEntries: []
    })

    const [battleEntryThisUser, battleEntryOpponentUser] = await Promise.all([
      BattleEntry.create({
        battleEmote: user.battleEmote.serialize(serializationCherryPick) as EmoteBattleEntry
      }),
      BattleEntry.create({
        battleEmote: opponent.battleEmote.serialize(serializationCherryPick) as EmoteBattleEntry
      })
    ])

    await Promise.all([
      battleEntryThisUser.related('user').associate(user.model),
      battleEntryThisUser.related('battle').associate(battle),
      battleEntryOpponentUser.related('user').associate(opponent.model),
      battleEntryOpponentUser.related('battle').associate(battle)
    ])

    const battleResult = await this.runBattle({ battle, user: battleEntryThisUser, opponent: battleEntryOpponentUser })

    battle.winningBattleEntries.push(...battleResult.winningEntries.map(bE => bE.id))

    await battle.save()

    // Calculate experience points & level
    const battleExperienceAlgorithm = await BattleStatisticAlgorithm.findBy('statistic', 'Experience') as BattleStatisticAlgorithm

    for (let index = 0; index < battleResult.entries.length; index++) {
      const battleEntry = battleResult.entries[index]
      const opponentBattleEntry = battleResult.entries[(index + 1) % battleResult.entries.length]

      const thisUser = battleEntry.userId === battleEntryThisUser.userId

      const context = {
        WIN: battleResult.winningEntries.some(wE => wE.id === battleEntry.id),
        userStatistic: BattleHandler.statisticArrayToObject(battleEntry.battleEmote),
        opponentStatistic: BattleHandler.statisticArrayToObject(opponentBattleEntry.battleEmote),
        opponentNextLevelExperience: 0
      }

      context.opponentNextLevelExperience = BattleStatic.nextLevelExperience(context.opponentStatistic.Level.defValue)

      vm.createContext(context)

      // eslint-disable-next-line
      let exp = Number(vm.runInContext(battleExperienceAlgorithm.func.cleanEval, context))

      context.userStatistic.Experience.curValue = Number(context.userStatistic.Experience.curValue) + exp
      let nextLevelExperience = BattleStatic.nextLevelExperience(context.userStatistic.Level.defValue)

      while (context.userStatistic.Experience.curValue >= nextLevelExperience) {
        // +1 to level
        context.userStatistic.Level.defValue = Number(context.userStatistic.Level.defValue) + 1
        context.userStatistic = BattleHandler.resetStatistics(context.userStatistic)

        // TODO: Send level-up WHISPER if initiator got a level-up.
        if (thisUser) {
          socket.send(this.ws.socketMessage(MessageType.WHISPER, JSON.stringify({
            ...data,
            result: {
              value: `(#${data.channelTwitch.name} | ${HelperStatic.profileType(data.global)}): Your battle emote leveled up! (${String(context.userStatistic.Level.defValue)})`
            }
          })))
        }

        // curValue - nextLevelExperience
        context.userStatistic.Experience.curValue -= nextLevelExperience
        nextLevelExperience = BattleStatic.nextLevelExperience(context.userStatistic.Level.defValue)
      }

      battleResult.entries[index].battleEmote.statistics = BattleHandler.statisticObjectToArray(context.userStatistic)
    }

    user.battleEmote.statistics = (battleResult.entries.find(bE => bE.id === battleEntryThisUser.id) as BattleEntry).battleEmote.statistics
    opponent.battleEmote.statistics = (battleResult.entries.find(bE => bE.id === battleEntryOpponentUser.id) as BattleEntry).battleEmote.statistics

    await Promise.all([
      user.battleEmote.save(),
      opponent.battleEmote.save()
    ])

    this.sendBattleMessage(socket, data, await this.resultMessage(battleResult, battleEntryThisUser.id))
  }

  public async runBattle ({ battle, user, opponent }: { battle: Battle, user: BattleEntry, opponent: BattleEntry }): Promise<{ entries: BattleEntry[], winningEntries: BattleEntry[], turn: number }> {
    // Attack logic
    // If current emote is dead, break early and return battle result.
    // Do normal attack
    // See if opponent has a special stat where applyOn="onDamage", do it.

    // If user battle emote has special stat, load the calculation from the DB.
    // If special stat, calculate the roll percentage and do it or don't do it.

    // End of attack cycle
    // If current emote has special stat where applyOn="afterAttack", calculate roll percentage and do or don't do it.

    const context = {} as any

    const battleEmotes = [user, opponent]
    let turn = 0

    const maxTurns = this.maxTurns * battleEmotes.length
    const random = new BattleStatic.Sfc32(battle.id)

    const [min, max] = [0, 100]

    const attackAlgorithm = await BattleStatisticAlgorithm.findBy('statistic', 'Attack') as BattleStatisticAlgorithm

    while (turn < maxTurns) {
      const battleEmoteTurn = turn % battleEmotes.length

      const attackingUser = battleEmotes.splice(battleEmoteTurn, 1)[0]
      const defendingUser = battleEmotes.splice(0, 1)[0]

      context.userStatistic = BattleHandler.statisticArrayToObject(attackingUser.battleEmote)

      // If current emote is dead, break early and return battle result.
      if (context.userStatistic.Health.curValue <= 0) {
        break
      }

      context.opponentStatistic = BattleHandler.statisticArrayToObject(defendingUser.battleEmote)

      vm.createContext(context)

      context.DAMAGE = vm.runInContext(attackAlgorithm.func.cleanEval, context)

      // Do normal attack
      vm.runInContext(attackAlgorithm.func.applyEval, context)

      // See if opponent has a special stat where applyOn="onDamage", do it.
      const opponentSpecialStat = this.getSpecialStat(defendingUser.battleEmote.statistics)

      /** min inclusive, max exclusive */
      const percentageOpponent = Math.floor(random.number() * (max - min + 1) + min)

      // Hard-locked 25% rate to hit. TODO: CHANGE LATER
      if (opponentSpecialStat !== undefined && (percentageOpponent + ((opponentSpecialStat.percentage ?? 0) * 100)) > 85) {
        const opponentSpecialStatAlgorithm = await BattleStatisticAlgorithm.findBy('statistic', opponentSpecialStat.name)

        if (opponentSpecialStatAlgorithm?.func.applyOn === 'onDamage') {
          vm.runInContext(opponentSpecialStatAlgorithm.func.applyEval, context)
        }
      }

      /** min inclusive, max exclusive */
      const percentage = Math.floor(random.number() * (max - min + 1) + min)

      const userSpecialStat = this.getSpecialStat(user.battleEmote.statistics)

      if (userSpecialStat !== undefined && (percentage + ((userSpecialStat.percentage ?? 0) * 100)) > 85) {
        const userSpecialStatAlgorithm = await BattleStatisticAlgorithm.findBy('statistic', userSpecialStat.name)

        if (userSpecialStatAlgorithm?.func.applyOn === 'afterAttack') {
          vm.runInContext(userSpecialStatAlgorithm.func.applyEval, context)
        }
      }

      attackingUser.battleEmote.statistics = BattleHandler.statisticObjectToArray(context.userStatistic)
      defendingUser.battleEmote.statistics = BattleHandler.statisticObjectToArray(context.opponentStatistic)

      battleEmotes.push(attackingUser, defendingUser)
      ++turn
    }

    const winningEntries: BattleEntry[] = []
    const entries = [user, opponent]

    for (let index = 0; index < entries.length; index++) {
      const entry = entries[index]
      const healthStatistic = entry.battleEmote.statistics.find(stat => stat.name === 'Health')
      if (healthStatistic !== undefined && healthStatistic.curValue > 0) winningEntries.push(entry)
    }

    return { entries: [user, opponent], winningEntries, turn }
  }

  public static statisticArrayToObject (battleEmote: EmoteBattleEntry | EmoteEntry): Statistics {
    const obj = {}
    const arr = battleEmote.statistics

    for (let index = 0; index < arr.length; index++) {
      const statistic = arr[index]

      if (statistic.type !== 'Statistic') continue

      obj[statistic.name] = { ...statistic }
    }

    return obj
  }

  public static statisticObjectToArray (obj: any): Data[] {
    return Object.values(obj).map((stat) => ({ ...stat as any }))
  }

  public async getWinnerNames (battleEntries: BattleEntry[]): Promise<string[]> {
    const winners: string[] = []

    for (let index = 0; index < battleEntries.length; index++) {
      const battleEntry = battleEntries[index]
      await battleEntry.load('user')
      winners.push(battleEntry.user.displayName)
    }

    return winners
  }

  public async resultMessage (battleResult: { winningEntries: BattleEntry[], entries: BattleEntry[], turn: number }, thisUserBattleEntryId: number): Promise<string> {
    const winnerNames = await this.getWinnerNames(battleResult.winningEntries)

    let thisUserStr = ''

    let msg = ''
    const opponentHPs: string[] = []

    for (let index = 0; index < battleResult.entries.length; index++) {
      const battleEntry = battleResult.entries[index]
      const battleEmoteName = await Emotes.getBattleEmoteName(battleEntry.battleEmote.emote_recipe, battleEntry.battleEmote.seed)
      const stats = BattleHandler.statisticArrayToObject(battleEntry.battleEmote)
      const specialStat = this.getSpecialStat(battleEntry.battleEmote.statistics) ?? { name: '' }

      if (battleEntry.id === thisUserBattleEntryId) {
        thisUserStr = BattleHandler.emoteMsg(battleEmoteName, stats, specialStat)
      } else {
        opponentHPs.push(BattleHandler.emoteMsg(battleEmoteName, stats, specialStat))
      }
    }

    const turnStr = battleResult.turn > 1 ? 'turns' : 'turn'
    const specialMsg = battleResult.turn === 1 ? ' 1 hit kill, ouch!' : ''
    if (winnerNames.length > 1) {
      msg += `stalemate! You all survived after ${battleResult.turn} ${turnStr}. [You] ${thisUserStr}. [Opponent] ${opponentHPs.join('. ')}.`
    } else if (battleResult.winningEntries.some(bE => bE.id === thisUserBattleEntryId)) {
      msg += `you win after ${battleResult.turn} ${turnStr} with ${thisUserStr}. [Opponent] ${opponentHPs.join('. ')}.${specialMsg}`
    } else if (winnerNames.length === 1) {
      msg += `you lost with ${thisUserStr} after ${battleResult.turn} ${turnStr}. [Opponent] ${opponentHPs.join('. ')}.${specialMsg}`
    } else {
      msg += `you all lost after ${battleResult.turn} turns. Unlucky, 🦆 rubber ducky.`
    }

    return msg
  }

  public static emoteMsg (battleEmoteName: string, statistics: Statistics, specialStat: Data | { name: string }): string {
    return `emote ${battleEmoteName} [LVL ${statistics.Level.curValue}]${specialStat.name.length > 0 ? ` [${specialStat.name}]` : ''}: ${String(statistics.Health.curValue.toFixed(2))} HP`
  }

  public getSpecialStat (statistics: Data[]): Data | undefined {
    return statistics.find(stat => stat.type === 'Statistic' && BattleStatic.namedDefaultStatisticsNames.includes(stat.name))
  }

  public sendBattleMessage (socket: ExtendedWebSocket, data: BATTLE, value: any): void {
    data.result = {
      value
    }

    socket.send(this.ws.socketMessage(MessageType.BATTLE, JSON.stringify(data)))
  }

  public static resetStatistics (statistics: Statistics): any {
    const lvl = statistics.Level.defValue

    statistics.Health.defValue = 10 + (lvl * 1.7)
    statistics.Health.curValue = 10 + (lvl * 1.7)
    statistics.Attack.defValue = lvl * 0.9
    statistics.Attack.curValue = lvl * 0.9
    statistics.Defense.defValue = lvl * 0.5
    statistics.Defense.curValue = lvl * 0.5

    return statistics
  }

  public static async resetUserBattleEmotes (user: User): Promise<void> {
    const battleEmotes = await BattleHandler.getBattleEmotes(user)

    for (let index = 0; index < battleEmotes.length; index++) {
      const battleEmote = battleEmotes[index]

      let statistics = BattleHandler.statisticArrayToObject(battleEmote)

      if (statistics.Health.curValue >= statistics.Health.defValue) continue

      statistics = BattleHandler.resetStatistics(statistics)

      battleEmote.statistics = BattleHandler.statisticObjectToArray(statistics)

      await battleEmote.save()
    }
  }
}

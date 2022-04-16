import Emote from 'App/Models/Emote'
import EmoteRecipe from 'App/Models/EmoteRecipe'
import { Emote as BotEmote, EMOTES, GIVEEMOTES, MessageType } from 'befriendlier-shared'
import { ExtendedWebSocket, ResSchema } from '../../Ws'
import DefaultHandler from '../DefaultHandler'
import Helper from '../Helpers'
import ProfileHandler from '../Profile/Profile'

export default class EmotesHandler extends DefaultHandler {
  public messageType = MessageType.EMOTES

  public async onClientResponse (socket: ExtendedWebSocket, res: ResSchema): Promise<void> {
    // TODO: Should we raise an error?
    if (res.data === undefined) return

    const data: EMOTES = JSON.parse(res.data)
    const emotes = await EmotesHandler.getEmotes(data)

    data.result = {
      value: `your ${ProfileHandler.profileType(data)} emotes: ${emotes.length > 0 ? emotes.map(emote => emote.name).join(' ') : 'None.'} | Inventory available at website.`
    }

    socket.send(this.ws.socketMessage(MessageType.EMOTES, JSON.stringify(data)))
  }

  public static async setEmotes ({ userTwitch, channelTwitch, emotes, global }: EMOTES): Promise<Emote[]> {
    const { profile } = await Helper.findProfileOrCreateByChatOwner(userTwitch, channelTwitch, global)

    // Reset emotes.
    profile.favoriteEmotes = []

    for (let index = 0; index < emotes.length; index++) {
      const { id, name } = emotes[index]
      const foundEmote = await Emote.firstOrCreate({ id }, { id, name })

      profile.favoriteEmotes.push(foundEmote.id)
    }

    await profile.save()

    return await Emote.findMany(profile.favoriteEmotes)
  }

  public static async getEmotes ({ userTwitch, channelTwitch, global }: EMOTES): Promise<Emote[]> {
    const { profile } = await Helper.findProfileOrCreateByChatOwner(userTwitch, channelTwitch, global)

    return await Emote.findMany(profile.favoriteEmotes)
  }

  // Deals with global profiles only.
  public static async giveEmotes ({ userTwitch, channelTwitch, recipientUserTwitch, emotes }: GIVEEMOTES): Promise<BotEmote[]> {
    const { user } = await Helper.findProfileOrCreateByChatOwner(userTwitch, channelTwitch, true)

    await user.load('emotes')

    // Check if they have emotes
    const nonExistentEmotes: string[] = []
    for (let index = 0; index < emotes.length; index++) {
      const emote = emotes[index]
      const existingEmote = user.emotes.find(ee => ee.emoteId === emote.id)

      // Does user have emote?
      if (existingEmote === undefined) {
        nonExistentEmotes.push(emote.name)
        continue
      }

      // Change requested values to what currently exists.
      if ((existingEmote.amount) < (emote.amount as number)) {
        emote.amount = existingEmote.amount
      }

      // You've got 0 of this emote, therefore it is nonexistent.
      if ((emote.amount as number) === 0) {
        nonExistentEmotes.push(emote.name)
      }
    }

    if (nonExistentEmotes.length > 0) {
      throw Helper.error(MessageType.ERROR, userTwitch, channelTwitch, `you don't have the following emotes: ${nonExistentEmotes.join(' ')}`)
    }

    // Check if recipient exists in case the client bot doesn't check for some reason.
    const recipientUserModel = await Helper.findUserByTwitchID(recipientUserTwitch.id)
    if (recipientUserModel === null) {
      throw Helper.error(MessageType.ERROR, userTwitch, channelTwitch, "the user you're attempting to give emotes to is not registered.")
    }

    // In case the client bot doesn't check for some reason.
    if (recipientUserModel.id === user.id) {
      throw Helper.error(MessageType.ERROR, userTwitch, channelTwitch, "no I don't think so, you're attempting to trade with yourself.")
    }

    // TODO: Allow this behaviour for now.
    // Recipient user isn't registered.
    // if (recipientUserModel.createdAt.year === 1970) {
    //   throw this.error(MessageType.ERROR, userTwitch, channelTwitch, "you can't send to that user.")
    // }

    await recipientUserModel.load('emotes')

    for (let index = 0; index < emotes.length; index++) {
      const emote = emotes[index]
      const existingUserEmoteIndex = user.emotes.findIndex(ee => ee.emoteId === emote.id)
      const existingUserEmote = user.emotes[existingUserEmoteIndex]

      existingUserEmote.amount -= emote.amount as number

      if (existingUserEmote.amount === 0) {
        await existingUserEmote.delete()
      } else {
        await user.related('emotes').save(existingUserEmote)
      }

      // Add emotes to recipient user.
      const existingRecipientUserEmote = recipientUserModel.emotes.find(ee => ee.emoteId === emote.id)

      if (existingRecipientUserEmote == null) {
        await recipientUserModel.related('emotes').create({
          emoteId: emote.id,
          amount: typeof emote.amount === 'number' ? emote.amount : 1
        })
      } else {
        existingRecipientUserEmote.amount += emote.amount as number
        await recipientUserModel.related('emotes').save(existingRecipientUserEmote)
      }
    }

    // Save both
    await Promise.all([user.save(), recipientUserModel.save()])

    return emotes
  }

  public static getEmotesNames (res: Emote[]): string {
    return res.map(emote => emote.name).join(' ')
  }

  public static async getBattleEmoteName (id: string, seed: string): Promise<string> {
    const recipe = await EmoteRecipe.find(id) as EmoteRecipe
    return recipe.images[Number(seed)].name
  }
}

import { BIO } from 'befriendlier-shared'
import DefaultHandler from '../DefaultHandler'
import Helper from '../Helpers'

export default class BioHandler extends DefaultHandler {
  /**
   * TODO: DO SOME ERROR HANDLING
   */
  public static async setBio ({ userTwitch, channelTwitch, global, bio }: BIO): Promise<string> {
    const { profile } = await Helper.findProfileOrCreateByChatOwner(userTwitch, channelTwitch, global)

    profile.bio = bio.toString()

    await profile.save()

    return profile.bio // `Here's a part of it: ${res.length > 32 ? `${res.substring(0, 32)}...` : res}`
  }

  /**
   * TODO: DO SOME ERROR HANDLING
   */
  public static async getBio ({ userTwitch, channelTwitch, global }: BIO): Promise<string> {
    const { profile } = await Helper.findProfileOrCreateByChatOwner(userTwitch, channelTwitch, global)

    return profile.bio
  }
}

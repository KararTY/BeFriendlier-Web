import Env from '@ioc:Adonis/Core/Env'

const TwitchConfig = {
  /**
   * Twitch client ID token.
   */
  clientToken: Env.getOrFail('TWITCH_CLIENT_TOKEN') as string,

  /**
   * Twitch client secret token.
   */
  clientSecret: Env.getOrFail('TWITCH_CLIENT_SECRET') as string,

  /**
   * Redirect URI.
   */
  redirectURI: Env.getOrFail('TWITCH_REDIRECT_URI') as string,

  /**
   * SUPERSECRET TOKEN
   */
  superSecret: Env.getOrFail('TWITCH_BOT_ACCESS_TOKEN') as string,

  /**
   * REFRESH TOKEN
   */
  refreshToken: Env.getOrFail('TWITCH_BOT_REFRESH_TOKEN') as string,

  /**
   * Twitch username. Used to make bot join default channel.
   */
  user: {
    name: Env.getOrFail('TWITCH_BOT_NAME') as string,
    id: Env.getOrFail('TWITCH_BOT_ID') as string,
  },

  /**
   * Scopes to ask for.
   */
  scope: [],

  /**
   * HTTP request headers.
   */
  headers: {
    'user-agent': 'befriendlierapp (https://github.com/kararty/befriendlier-web)',
  },
}

export default TwitchConfig

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
   * Scopes to ask for.
   */
  scopes: ['user_subscriptions'],

  /**
   * HTTP request headers.
   */
  headers: {
    'user-agent': 'befriendlierapp (https://github.com/kararty/befriendlier-web)',
  },
}

export default TwitchConfig

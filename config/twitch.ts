import Env from '@ioc:Adonis/Core/Env'

const TwitchConfig = {
  /**
   * Twitch Client ID Token
   */
  clientToken: Env.getOrFail('TWITCH_CLIENT_TOKEN') as string,

  /**
   * Twitch Client Secret Token
   */
  clientSecret: Env.getOrFail('TWITCH_CLIENT_SECRET') as string,

  /**
   * Redirect URI.
   */
  redirectURI: 'http://localhost:3333/register',

  /**
   * Scopes to ask for.
   */
  scopes: ['user_subscriptions'],
}

export default TwitchConfig

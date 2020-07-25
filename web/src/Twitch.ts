import fetch from 'got'

const defaultHeader = { 'user-agent': 'friendapp (https://github.com/kararty/twitchr)' }

export interface TwitchUsersBody {
  id: string
  login: string
  display_name: string
  type: 'staff' | 'admin' | 'global_mod' | ''
  broadcaster_type: 'partner' | 'affiliate' | ''
  description: string
  profile_image_url: string
  offline_image_url: string
  view_count: number
}

export interface TwitchAuthBody {
  access_token: string
  refresh_token: string
  expires_in: number
  scope?: string
  token_type: string
}

export interface TwitchValidateBody {
  client_id: string
  expires_in: number
  login: string
  scopes: string[]
  user_id: string
}

export class Client {
  private readonly token: string
  private readonly secret: string
  private readonly scopes: string
  private readonly redirectURI: string
  private readonly Logger

  constructor (env, config, Logger) {
    this.token = env.get('TWITCH_CLIENT_TOKEN')
    this.secret = env.get('TWITCH_CLIENT_SECRET')
    this.scopes = config.get('twitch.scopes').join(' ')
    this.redirectURI = config.get('twitch.redirectURI')
    this.Logger = Logger
  }

  public async requestToken (code: string): Promise<TwitchAuthBody | null> {
    const searchParams = {
      client_id: this.token,
      client_secret: this.secret,
      grant_type: 'authorization_code',
      code,
      redirect_uri: this.redirectURI,
      scope: this.scopes,
    }

    try {
      const { body }: any = await fetch.post('https://id.twitch.tv/oauth2/token', {
        headers: { ...defaultHeader },
        searchParams,
        responseType: 'json',
      })
      return body
    } catch (error) {
      this.Logger.error('Twitch.requestToken()', error)
      return null
    }
  }

  public async getUser (token: string): Promise<TwitchUsersBody | null>
  public async getUser (token: string, usernames?: string[]): Promise<TwitchUsersBody[] | null>
  public async getUser (token: string, usernames?: string[]): Promise<TwitchUsersBody | TwitchUsersBody[] | null> {
    try {
      const { body }: any = await fetch.get(`https://api.twitch.tv/helix/users?${usernames instanceof Array ? usernames.map((i, ind) => ind > 0 ? '&login=' + i : 'login=' + i).join('') : ''}`, {
        headers: {
          ...defaultHeader,
          'Client-ID': this.token,
          Authorization: `Bearer ${token}`,
        },
        responseType: 'json',
      })

      if (usernames instanceof Array) {
        return body.data.length > 0 ? body.data as TwitchUsersBody[] : null
      } else {
        return body.data[0] !== undefined ? body.data[0] as TwitchUsersBody : null
      }
    } catch (error) {
      this.Logger.error('Twitch.getUser()', error)
      return null
    }
  }

  public async refreshToken (token: string): Promise<TwitchAuthBody | null> {
    const searchParams = {
      client_id: this.token,
      client_secret: this.secret,
      grant_type: 'refresh_token',
      refresh_token: encodeURI(token), // Per https://dev.twitch.tv/docs/authentication/#refreshing-access-tokens:~:text=URL%20encode
      scope: this.scopes,
    }

    try {
      const { body }: any = await fetch.post('https://id.twitch.tv/oauth2/token', {
        headers: { ...defaultHeader },
        searchParams,
        responseType: 'json',
      })

      return body as TwitchAuthBody
    } catch (error) {
      this.Logger.error('Twitch.refreshToken()', error)
      return null
    }
  }

  public async validateToken (token: string): Promise<TwitchValidateBody | null> {
    try {
      const { body }: any = await fetch.get('https://id.twitch.tv/oauth2/validate', {
        headers: {
          ...defaultHeader,
          'Client-ID': this.token,
          Authorization: `OAuth ${token}`,
        },
        responseType: 'json',
      })

      return body as TwitchValidateBody
    } catch (error) {
      this.Logger.error('Twitch.validateToken()', error)
      return null
    }
  }

  public authorizationURL (csrfToken: string) {
    let url = 'https://id.twitch.tv/oauth2/authorize?response_type=code'

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    url += `&client_id=${this.token}`
    url += `&redirect_uri=${this.redirectURI}`
    url += `&scope=${this.scopes}`
    url += '&force_verify=true'
    url += `&state=${csrfToken}`

    return url
  }
}

export default Client

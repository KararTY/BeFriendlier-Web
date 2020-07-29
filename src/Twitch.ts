import fetch, { Headers } from 'got'

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
  private readonly redirectURI: string
  private readonly scopes: string
  private readonly headers: Headers
  private readonly logger

  constructor (config, logger) {
    this.token = config.get('twitch.clientToken')
    this.secret = config.get('twitch.clientSecret')
    this.redirectURI = config.get('twitch.redirectURI')
    this.scopes = config.get('twitch.scopes').join(' ')
    this.headers = config.get('twitch.headers')
    this.logger = logger
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
        headers: { ...this.headers },
        searchParams,
        responseType: 'json',
      })
      return body
    } catch (error) {
      this.logger.error(null, 'Twitch.requestToken(): %O', error.response.body)
      return null
    }
  }

  public async getUser (token: string): Promise<TwitchUsersBody | null>
  public async getUser (token: string, usernames?: string[]): Promise<TwitchUsersBody[] | null>
  public async getUser (token: string, usernames?: string[]): Promise<TwitchUsersBody | TwitchUsersBody[] | null> {
    try {
      const { body }: any = await fetch.get(`https://api.twitch.tv/helix/users?${usernames instanceof Array ? usernames.map((i, ind) => ind > 0 ? '&login=' + i : 'login=' + i).join('') : ''}`, {
        headers: {
          ...this.headers,
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
      this.logger.error(null, 'Twitch.getUser(): %O', error.response.body)
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
        headers: { ...this.headers },
        searchParams,
        responseType: 'json',
      })

      return body as TwitchAuthBody
    } catch (error) {
      this.logger.error(null, 'Twitch.refreshToken(): %O', error.response.body)
      return null
    }
  }

  public async validateToken (token: string): Promise<TwitchValidateBody | null> {
    try {
      const { body }: any = await fetch.get('https://id.twitch.tv/oauth2/validate', {
        headers: {
          ...this.headers,
          'Client-ID': this.token,
          Authorization: `OAuth ${token}`,
        },
        responseType: 'json',
      })

      return body as TwitchValidateBody
    } catch (error) {
      this.logger.error(null, 'Twitch.validateToken() %O', error.response.body)
      return null
    }
  }

  public authorizationURL (csrfToken: string) {
    let url = 'https://id.twitch.tv/oauth2/authorize?response_type=code'

    url += `&client_id=${this.token}`
    url += `&redirect_uri=${this.redirectURI}`
    url += `&scope=${this.scopes}`
    url += '&force_verify=true'
    url += `&state=${csrfToken}`

    return url
  }
}

export default Client

import fetch from 'got'

const defaultHeader = { 'user-agent': 'friendapp/0.0.0 (https://github.com/kararty/twitchr)' }

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

export class Client {
  private readonly token: string
  private readonly secret: string

  constructor (config: any) {
    this.token = config.get('TWITCH_CLIENT_TOKEN')
    this.secret = config.get('TWITCH_CLIENT_SECRET')
  }

  public async requestToken (code: string) {
    const searchParams = {
      client_id: this.token,
      client_secret: this.secret,
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'http://localhost:3333/register',
    }

    const { body }: any = await fetch.post('https://id.twitch.tv/oauth2/token', {
      headers: { ...defaultHeader },
      searchParams,
      responseType: 'json',
    })

    return body
  }

  public async getUser (token: string, usernames?: string[]): Promise<TwitchUsersBody | null>
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
      console.error(error)
      return null
    }
  }

  public async validateToken () {}
}

export default Client

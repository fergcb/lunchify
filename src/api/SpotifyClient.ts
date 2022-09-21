import { api } from '.'
import AuthManager from './AuthManager'

export default class SpotifyClient {
  constructor (
    private readonly baseURL: string = 'https://api.spotify.com/v1',
    public readonly auth: AuthManager = new AuthManager(),
  ) {
    auth.init()
  }

  async get (resource: string, options: RequestInit = {}): Promise<Response> {
    if (!api.auth.ready) throw new Error(`Request to '${resource}' forbidden: client must be authenticated.`)

    return await fetch(
      new URL(resource, this.baseURL),
      {
        ...options,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.auth.token}`,
        },
      },
    )
  }
}

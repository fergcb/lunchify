import { api } from '.'
import AuthManager from './AuthManager'

export default class SpotifyClient {
  constructor (
    private readonly baseURL: string = 'https://api.spotify.com/v1',
    public readonly auth: AuthManager = new AuthManager(),
  ) {
    auth.init()
  }

  async fetch (resource: string, options: RequestInit = {}): Promise<Response> {
    if (!api.auth.ready) throw new Error(`Request to '${resource}' forbidden: client must be authenticated.`)

    return await fetch(
      this.baseURL + resource,
      {
        ...options,
        headers: {
          Authorization: `Bearer ${this.auth.token}`,
        },
      },
    )
  }

  async get (resource: string, options: RequestInit = {}): Promise<Response> {
    return await this.fetch(resource, { ...options, method: 'GET' })
  }

  async post (resource: string, options: RequestInit = {}): Promise<Response> {
    return await this.fetch(resource, { ...options, method: 'POST' })
  }

  async put (resource: string, options: RequestInit = {}): Promise<Response> {
    return await this.fetch(resource, { ...options, method: 'PUT' })
  }
}

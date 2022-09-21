const TOKEN_KEY = 'spotify-access-token'
const EXPIRY_KEY = 'spotify-token-expiry'

const CLIENT_ID = 'd7f2768db15a4ee8bfadf8ab80921a25'
const REDIRECT_URI = 'http://localhost:3000/'
const SCOPE = 'user-read-email user-library-read user-top-read playlist-read-private streaming'
const BASE_URL = 'https://accounts.spotify.com/authorize'

export default class AuthManager {
  private accessToken: string | null = null

  public init (): void {
    const urlToken = this.readTokenFromURL()
    if (urlToken !== null) {
      this.accessToken = urlToken
      return
    }
    this.accessToken = this.readTokenFromLocalStorage()
  }

  login (): void {
    const state = crypto.randomUUID()
    localStorage.setItem('lunchify-auth-state', state)

    const url = new URL(BASE_URL)
    url.searchParams.set('response_type', 'token')
    url.searchParams.set('client_id', CLIENT_ID)
    url.searchParams.set('scope', SCOPE)
    url.searchParams.set('redirect_uri', REDIRECT_URI)
    url.searchParams.set('state', state)

    window.location.href = url.toString()
  }

  private readTokenFromURL (): string | null {
    // If there's an access token in the URL params,
    // add it to local storage and return it
    const hash = window.location.hash.substring(1)
    const urlParams = new URLSearchParams(hash)
    const accessToken = urlParams.get('access_token')

    if (accessToken === null) return null

    const expiresInParam = urlParams.get('expires_in') as string
    const expiresInSeconds = parseInt(expiresInParam, 10)
    const expiry = new Date()
    expiry.setSeconds(expiry.getSeconds() + expiresInSeconds)

    this.setLocalStorage(accessToken, expiry.toISOString())

    // Clear URL hash
    window.history.replaceState({}, '', window.location.pathname + window.location.search)

    return accessToken
  }

  private readTokenFromLocalStorage (): string | null {
    // Check for an existing access token
    const accessToken = localStorage.getItem(TOKEN_KEY)
    if (accessToken === null) return null

    // Check if the access token is expired
    const expiryString = localStorage.getItem(EXPIRY_KEY)
    if (expiryString === null) {
      this.clearLocalStorage()
      return null
    }

    const expiry = new Date(expiryString)
    const now = new Date()
    if (expiry < now) {
      this.clearLocalStorage()
      return null
    }

    return accessToken
  }

  setLocalStorage (accessToken: string, expiry: string): void {
    localStorage.setItem(TOKEN_KEY, accessToken)
  }

  clearLocalStorage (): void {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(EXPIRY_KEY)
  }

  get token (): string {
    if (this.accessToken !== null) return this.accessToken
    throw new Error('No access token available. The user is not logged in.')
  }

  get ready (): boolean {
    return this.accessToken !== null
  }
}

const TOKEN_KEY = 'spotify-access-token'
const EXPIRY_KEY = 'spotify-token-expiry'

function clearLocalStorage (): void {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(EXPIRY_KEY)
}

export default function getAccessToken (): string | null {
  // If there's an access token in the URL params,
  // add it to local storage and return it
  const hash = window.location.hash.substring(1)
  const urlParams = new URLSearchParams(hash)
  const accessTokenParam = urlParams.get('access_token')

  if (accessTokenParam !== null) {
    const expiresInParam = urlParams.get('expires_in') as string
    const expiresInSeconds = parseInt(expiresInParam, 10)

    const expiry = new Date()
    expiry.setSeconds(expiry.getSeconds() + expiresInSeconds)

    localStorage.setItem(TOKEN_KEY, accessTokenParam)
    localStorage.setItem(EXPIRY_KEY, expiry.toISOString())

    window.history.replaceState({}, '', window.location.pathname + window.location.search)

    return accessTokenParam
  }

  // Check for an existing access token
  const accessToken = localStorage.getItem(TOKEN_KEY)
  if (accessToken === null) return null

  // Check if the access token is expired
  const expiryString = localStorage.getItem(EXPIRY_KEY)
  if (expiryString === null) {
    clearLocalStorage()
    return null
  }

  const expiry = new Date(expiryString)
  const now = new Date()
  if (expiry < now) {
    clearLocalStorage()
    return null
  }

  return accessToken
}

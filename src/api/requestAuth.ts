const CLIENT_ID = 'd7f2768db15a4ee8bfadf8ab80921a25'
const REDIRECT_URI = 'http://localhost:3000/'
const SCOPE = 'user-read-email user-library-read user-top-read playlist-read-private streaming'
const BASE_URL = 'https://accounts.spotify.com/authorize'

export default function requestAuth (): void {
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

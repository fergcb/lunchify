import getAccessToken from './getAccessToken'
export default async function getUsersPlaylists (): Promise<String> {
  const accessToken = getAccessToken()
  if (accessToken === null) {
    throw new Error('No access token - cant get playlists')
  }
  // get a list of the users playlists
  const response = await fetch('https://api.spotify.com/v1/me/playlists', {
    headers: {
      Authorization: 'Bearer ' + (accessToken),
    },
  })
  const playlists = await response.text()
  return playlists
}

import getAccessToken from './getAccessToken'
import Track from '../types/Track'

export default async function getRandomTrackFromLibrary (previousTargets: string[]): Promise<Track> {
  const accessToken = getAccessToken()
  if (accessToken === null) {
    throw new Error('No access token - cannot fetch user saved tracks')
  }
  const totalTracksCount: number = await getSavedTracksCount()
  if (totalTracksCount <= 0) {
    throw new Error('No saved tracks found')
  }
  let exit: boolean = false
  let data
  // keep fetching random song until one is found that doesn't exist in previous targets
  while (!exit) {
    const offset = Math.floor(Math.random() * (totalTracksCount - 1))
    const response = await fetch(`https://api.spotify.com/v1/me/tracks?offset=${offset}&limit=1`, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
    data = await response.json()
    const uri: string = data.items[0].track.uri
    if (!previousTargets.includes(uri)) {
      console.log(data)
      exit = true
    }
  }

  const artist = data.artists[0]
  const album = data.album

  return {
    name: data.name,
    artist: {
      name: artist.name,
      uri: artist.uri,
    },
    album: {
      name: album.name,
      uri: album.uri,
      image: album.images[1].url,
    },
  }
}

async function getSavedTracksCount (): Promise<number> {
  const accessToken = getAccessToken()
  if (accessToken === null) {
    throw new Error('No access token - cannot fetch user saved tracks')
  }
  const response = await fetch('https://api.spotify.com/v1/me/tracks', {
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  })
  const tracks = await response.json()
  return tracks.total
}

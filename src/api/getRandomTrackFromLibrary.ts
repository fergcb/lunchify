import Track from '../types/Track'
import { api } from '.'

export default async function getRandomTrackFromLibrary (previousTargets: string[]): Promise<Track> {
  const totalTracksCount: number = await getSavedTracksCount()
  if (totalTracksCount <= 0) {
    throw new Error('No saved tracks found')
  }
  let exit: boolean = false
  let track
  // keep fetching random song until one is found that doesn't exist in previous targets
  while (!exit) {
    const offset = Math.floor(Math.random() * (totalTracksCount - 1))
    const response = await api.get(`/me/tracks?offset=${offset}&limit=1`)
    const data = await response.json()
    track = data.items[0].track
    const uri: string = track.uri
    if (!previousTargets.includes(uri)) {
      exit = true
    }
  }

  const artist = track.artists[0]
  const album = track.album

  return {
    name: track.name,
    uri: track.uri,
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
  const response = await api.get('/me/tracks')
  const tracks = await response.json()
  return tracks.total
}

import Track from '../types/Track'
import { api } from '.'

export default async function getRandomTrackFromLibrary (previousTargets: string[]): Promise<Track> {
  const totalTracksCount: number = await getSavedTracksCount()
  if (totalTracksCount <= 0) {
    throw new Error('No saved tracks found')
  }
  let exit: boolean = false
  let data
  // keep fetching random song until one is found that doesn't exist in previous targets
  while (!exit) {
    const offset = Math.floor(Math.random() * (totalTracksCount - 1))
    const response = await api.get(`/me/tracks?offset=${offset}&limit=1`)
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
  const response = await api.get('/me/tracks')
  const tracks = await response.json()
  return tracks.total
}

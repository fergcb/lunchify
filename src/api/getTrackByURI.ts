import Track from '../types/Track'
import { extractID } from './utils'
import { TrackURI } from '../types/URI'
import { api } from '.'

export default async function getTrackByURI (trackURI: TrackURI): Promise<Track> {
  const trackID = extractID(trackURI)

  // fetch the song information
  const response = await api.get(`/tracks/${trackID}`)

  // parse the response JSON
  const data = await response.json()

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

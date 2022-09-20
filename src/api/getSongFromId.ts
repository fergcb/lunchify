import getAccessToken from './getAccessToken'
import Track from '../types/Track'
import { extractID } from './utils'
import { TrackURI } from '../types/URI'

export default async function getSongFromId (trackURI: TrackURI): Promise<Track> {
  const accessToken = getAccessToken()
  if (accessToken === null) {
    throw new Error('No access token - cant get playlists')
  }

  const trackID = extractID(trackURI)

  // fetch the song information
  const response = await fetch(`https://api.spotify.com/v1/tracks/${trackID}`, {
    headers: {
      Authorization: 'Bearer ' + (accessToken),
    },
  })

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

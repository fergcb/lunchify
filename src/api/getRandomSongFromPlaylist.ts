import { PlaylistURI, TrackURI } from '../types/URI'
import getAccessToken from './getAccessToken'
import { extractID } from './utils'

// playlist id to test with 1H1n2YSDnV1Ooplw00LROs
// function to return a random song from a given playlist ID and returns songID
export default async function getRandomSongFromPlaylist (playlistURI: PlaylistURI): Promise<TrackURI> {
  const accessToken = getAccessToken()
  if (accessToken === null) {
    throw new Error('No access token - cant get playlists')
  }

  const playlistID = extractID(playlistURI)

  // get a list of the songs in the users playlist from the id
  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
    headers: {
      Authorization: 'Bearer ' + (accessToken),
    },
  })
  // return json for all of the songs in the playlist
  const playlistInfo = await response.json()
  // get how many tracks in the playlist
  const totalTracks: number = playlistInfo.items.length
  // get a random integer between 0 and totalTracks
  const index: number = Math.floor(Math.random() * (totalTracks + 1))
  // get the random track info based on the index
  const randomTrack = playlistInfo.items[index]

  const trackURI: TrackURI = randomTrack.track.uri

  return trackURI
}

import { PlaylistURI, TrackURI } from '../types/URI'
import { api } from '.'
import { extractID } from './utils'

export default async function getRandomTrackFromPlaylist (playlistURI: PlaylistURI): Promise<TrackURI> {
  const playlistID = extractID(playlistURI)
  const res = await api.get(`/playlists/${playlistID}/tracks`)
  const data = await res.json()
  const totalTracks: number = data.items.length
  const index: number = Math.floor(Math.random() * (totalTracks + 1))
  const track = data.items[index]
  return track.track.uri
}

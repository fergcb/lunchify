import Playlist from '../types/Playlist'
import { api } from '.'

// Return an array of playlist information for a user
export default async function getUsersPlaylists (): Promise<Playlist[]> {
  // Fetch up to 50 of the current user's saved playlists
  const res = await api.get('https://api.spotify.com/v1/me/playlists?limit=50')
  const data = await res.json()
  const playlists = data.items

  return playlists
    // Omit empty playlists
    .filter((playlist: any) => playlist.tracks.total > 0)
    // Extract only needed data
    .map((playlist: any) => ({
      name: playlist.name,
      uri: playlist.uri,
      image: playlist.images.length < 2 ? playlist.images[0] : playlist.images[1],
    }))
}

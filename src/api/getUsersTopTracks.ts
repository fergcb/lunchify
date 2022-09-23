import Track from '../types/Track'
import { api } from '.'

/*
    Function to return an array of songs for the users most played songs

    timeRange:
      'short_term' -> last 4 weeks
      'medium_term'-> last 6 months
      'long_term' -> several years of data

    limit is the number of songs to return, max = 50
*/
export default async function getUsersTopTracks (timeRange: 'short_term' | 'medium_term' | 'long_term', limit: number): Promise<Track[]> {
  // get a list of the users top tracks
  const response = await api.get(`/me/top/tracks?time_range=${timeRange}&limit=${limit}&offset=0`)
  const topTracksResponse = await response.json()
  const tracks = topTracksResponse.items
  // return all tracks with only the needed data
  return tracks
    .map((track: any) => ({
      name: track.name,
      artist: {
        name: track.artists[0].name,
        uri: track.artists[0].uri,
      },
      album: {
        name: track.album.name,
        uri: track.album.uri,
        image: track.album.images[1].url,
      },
    }))
}

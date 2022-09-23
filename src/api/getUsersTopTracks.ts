import Track from '../types/Track'
import { api } from '.'

/*
    Function to return an array of songs for the users most played songs
    short_term is the users top played songs in the last month and has a max return of 25
    medium_term is the users top played songs in the last year and has a max return of 25
    long_term is the users top played songs and has a max return of 50
*/
export default async function getUsersTopTracks (timeRange: 'short_term' | 'medium_term' | 'long_term', limit: number): Promise<Track[]> {
  // get a list of the users top tracks
  const response = await api.get(`/v1/me/top/tracks?time_range=${timeRange}&limit=${limit}&offset=0`)
  const topTracksResponse = await response.json()
  const tracks = topTracksResponse.items
  // return all tracks with only the needed data
  return tracks
    .map((track: any) => ({
      name: track.name,
      artist: {
        name: track.artists[0],
        uri: track.artists[0].uri,
      },
      album: {
        name: track.album.name,
        uri: track.album.uri,
        image: track.album.images[1].url,
      },
    }))
}

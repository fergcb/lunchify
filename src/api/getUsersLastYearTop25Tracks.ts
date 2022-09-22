import Track from '../types/Track'
import { api } from '.'

// function to return an array of songs for the users most played songs
export default async function getUsersLastYearTop25Tracks (): Promise<Track[]> {
  // get a list of the users top 50 tracks
  const response = await api.get('/v1/me/top/tracks?time_range=medium_term&limit=25&offset=0')
  // return json for all songs
  const topTracksResponse = await response.json()
  const topTracks: Track[] = []
  for (let i = 0; i < topTracksResponse.items.length; i++) {
    // get song name
    const name: string = topTracksResponse.items[i].name
    // get artist and artist ID
    const artist: string = topTracksResponse.items[i].artists[0].name
    const artistUri = topTracksResponse.items[i].artists[0].uri
    // get album and album ID and album artwork
    const album: string = topTracksResponse.items[i].album.name
    const albumUri = topTracksResponse.items[i].album.uri
    const albumArt: string = topTracksResponse.items[i].album.images[1].url
    // format the Song interface
    const songInfo: Track = {
      name,
      artist: {
        name: artist,
        uri: artistUri,
      },
      album: {
        name: album,
        uri: albumUri,
        image: albumArt,
      },
    }
    // append the information for each song
    topTracks.push(songInfo)
  }
  return topTracks
}

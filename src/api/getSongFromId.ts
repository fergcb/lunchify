import getAccessToken from './getAccessToken'
import { Song } from '../interfaces/Song'

// song id to test with 0870QNicMawQH2cnzBVZ3P
// function that returns song interface from given a song ID
export default async function getSongFromId (songId: string): Promise<Song> {
  const accessToken = getAccessToken()
  if (accessToken === null) {
    throw new Error('No access token - cant get playlists')
  }
  // get the songs infomation from the id
  const response = await fetch('https://api.spotify.com/v1/tracks/' + songId, {
    headers: {
      Authorization: 'Bearer ' + (accessToken),
    },
  })
  // return json the song infomation
  const allSongInfo = await response.json()
  // get song name
  const name: string = allSongInfo.name
  // get artist and artist ID
  const artist: string = allSongInfo.artists[0].name
  const artistId: string = allSongInfo.artists[0].id
  const artistUri: string = allSongInfo.artists[0].uri
  // get album and album ID and album artwork
  const album: string = allSongInfo.album.name
  const albumId: string = allSongInfo.album.id
  const albumUri: string = allSongInfo.album.uri
  const albumArt: string = allSongInfo.album.images[1].url
  // format the Song interface
  const songInfo: Song = { name, artist, artistId, artistUri, album, albumId, albumUri, albumArt }

  return songInfo
}

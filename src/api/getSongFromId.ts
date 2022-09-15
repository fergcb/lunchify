import getAccessToken from './getAccessToken'

// function that returns song infomation from given a song ID
// [song, artist, artistID, album, albumId, albumArt]
export default async function getSongFromId (songId: string): Promise<any[]> {
  const accessToken = getAccessToken()
  if (accessToken === null) {
    throw new Error('No access token - cant get playlists')
  }
  // get a list of the users playlists limited to 50
  const response = await fetch('https://api.spotify.com/v1/tracks/' + songId, {
    headers: {
      Authorization: 'Bearer ' + (accessToken),
    },
  })
  // return json the song infomation
  const allSongInfo = await response.json()
  // get song name
  const song: String = allSongInfo.name
  // get artist and artist ID
  const artist: String = allSongInfo.artists[0].name
  const artistId: String = allSongInfo.artists[0].id
  // get album and album ID and album artwork
  const album: String = allSongInfo.album.name
  const albumId: String = allSongInfo.album.id
  const albumArt: String = allSongInfo.album.images[1].url
  // format the array of infomation needed for components
  const songInfo: any[] = [song, artist, artistId, album, albumId, albumArt]
  return songInfo
}

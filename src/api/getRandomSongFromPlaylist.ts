import getAccessToken from './getAccessToken'

// function to return a random song from a given playlist ID and returns songID
export default async function getRandomSongFromPlaylist (playlistId: string): Promise<String> {
  const accessToken = getAccessToken()
  if (accessToken === null) {
    throw new Error('No access token - cant get playlists')
  }
  // get a list of the songs in the users playlist from the id
  const response = await fetch('https://api.spotify.com/v1/playlists/' + playlistId + '/tracks', {
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
  const randomSong = playlistInfo.items[index]
  // get the song ID
  const songId: String = randomSong.track.id
  return songId
}

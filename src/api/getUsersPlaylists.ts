import getAccessToken from './getAccessToken'

// function to return an array of playlist information for a user and returned in the format of
// [play list name, play list id, playlist image url]
export default async function getUsersPlaylists (): Promise<any[]> {
  const accessToken = getAccessToken()
  if (accessToken === null) {
    throw new Error('No access token - cant get playlists')
  }
  // get a list of the users playlists limitied to 50
  const response = await fetch('https://api.spotify.com/v1/me/playlists?limit=50', {
    headers: {
      Authorization: 'Bearer ' + (accessToken),
    },
  })
  // return json for all playlists of the user
  const playlists = await response.json()
  // how many playlists were found
  const playlistsFound = playlists.items.length
  // create an empty array to store the basic information of each playlist
  const allPlaylists: any[] = []
  for (let i = 0; i < playlistsFound; i++) {
    // from the json object extract relevant information that can be used
    const playlistName = playlists.items[i].name
    const playListId = playlists.items[i].id
    const playListImageUrl = playlists.items[i].images[1].url
    // create the array of information for ech playlist
    const playlistInfo: any[] = [playlistName, playListId, playListImageUrl]
    // append the information for each playlist to allPlaylists array
    allPlaylists.push(playlistInfo)
  }

  return allPlaylists
}

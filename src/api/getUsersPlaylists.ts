import { Playlist } from '../interfaces/Playlist'
import getAccessToken from './getAccessToken'

// function to return an array of playlist information for a user and returned as a Playlist interface
export default async function getUsersPlaylists (): Promise<Playlist[]> {
  const accessToken = getAccessToken()
  if (accessToken === null) {
    throw new Error('No access token - cant get playlists')
  }
  // get a list of the users playlists limited to 50
  const response = await fetch('https://api.spotify.com/v1/me/playlists?limit=50', {
    headers: {
      Authorization: 'Bearer ' + (accessToken),
    },
  })
  // return json for all playlists of the user
  const playlists = await response.json()
  // how many playlists were found
  const playlistsFound = playlists.items.length
  // create an empty array to store the information of each playlist
  const UserPlaylists: Playlist[] = []
  // loop through all playlists
  for (let i = 0; i < playlistsFound; i++) {
    // if playlist is empty skip
    if (playlists.items[i].tracks.total === 0) {
      continue
    } else {
    // from the json object extract relevant information that can be used
      const playlistName = playlists.items[i].name
      const playListId = playlists.items[i].id
      const playListUri = playlists.items[i].uri
      let playListImageUrl: string
      // check images length before assigning image url TODO
      if ((playlists.items[i].images).length < 2) {
        playListImageUrl = playlists.items[i].images[0].url
      } else {
        playListImageUrl = playlists.items[i].images[1].url
      }
      // create the Playlist interface for each playlist
      const playlistInfo: Playlist = { name: playlistName, playListId, playListUri, playListImage: playListImageUrl }
      // append the information for each playlist
      UserPlaylists.push(playlistInfo)
    }
  }

  return UserPlaylists
}

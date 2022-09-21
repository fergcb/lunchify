import SpotifyClient from './SpotifyClient'

import getRandomTrackFromLibrary from './getRandomTrackFromLibrary'
import getRandomTrackFromPlaylist from './getRandomTrackFromPlaylist'
import getTrackFromURI from './getTrackByURI'
import getUsersPlaylists from './getUsersPlaylists'

const api = new SpotifyClient()

export {
  api,
  getRandomTrackFromLibrary,
  getRandomTrackFromPlaylist,
  getTrackFromURI,
  getUsersPlaylists,
}

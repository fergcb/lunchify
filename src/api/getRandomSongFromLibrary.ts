import getAccessToken from './getAccessToken'
import { Song } from '../interfaces/Song'

export default async function getSavedTrack (previousTargets: string[]): Promise<Song> {
  const accessToken = getAccessToken()
  if (accessToken === null) {
    throw new Error('No access token - cannot fetch user saved tracks')
  }
  const totalTracksCount: number = await getSavedTracksCount()
  if (totalTracksCount <= 0) {
    throw new Error('No saved tracks found')
  }
  let exit: boolean = false
  let songJson
  // keep fetching random song until one is found that doesn't exist in previous targets
  while (!exit) {
    const offset = Math.floor(Math.random() * (totalTracksCount - 1))
    const response = await fetch(`https://api.spotify.com/v1/me/tracks?offset=${offset}&limit=1`, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    })
    songJson = await response.json()
    const uri: string = songJson.items[0].track.uri
    if (!previousTargets.includes(uri)) {
      console.log(songJson)
      exit = true
    }
  }
  // get song name
  const name: string = songJson.items[0].track.name
  // get artist and artist ID
  const artist: string = songJson.items[0].track.artists[0].name
  const artistId: string = songJson.items[0].track.artists[0].id
  const artistUri: string = songJson.items[0].track.artists[0].uri
  // get album and album ID and album artwork
  const album: string = songJson.items[0].track.album.name
  const albumId: string = songJson.items[0].track.album.id
  const albumUri: string = songJson.items[0].track.album.uri
  const albumArt: string = songJson.items[0].track.album.images[1].url
  const songInfo: Song = { name, artist, artistId, artistUri, album, albumId, albumUri, albumArt }
  return songInfo
}

async function getSavedTracksCount (): Promise<number> {
  const accessToken = getAccessToken()
  if (accessToken === null) {
    throw new Error('No access token - cannot fetch user saved tracks')
  }
  const response = await fetch('https://api.spotify.com/v1/me/tracks', {
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  })
  const tracks = await response.json()
  return tracks.total
}

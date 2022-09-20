import { PlaylistID, PlaylistURI, SpotifyID, SpotifyURI, TrackID, TrackURI, ResourceType, AlbumID, AlbumURI, ArtistID, ArtistURI } from '../types/URI'

function extractID (uri: AlbumURI): AlbumID
function extractID (uri: ArtistURI): ArtistID
function extractID (uri: PlaylistURI): PlaylistID
function extractID (uri: TrackURI): TrackID
function extractID (uri: SpotifyURI<ResourceType>): SpotifyID {
  return uri.split(':')[2]
}

function extractType (uri: SpotifyURI<ResourceType>): ResourceType {
  const typeString = uri.split(':')[1]

  switch (typeString) {
    case 'album':
      return ResourceType.Album
    case 'artist':
      return ResourceType.Artist
    case 'playlist':
      return ResourceType.Playlist
    case 'track':
      return ResourceType.Track
    default:
      throw new Error(`Invalid URI type ${typeString}`)
  }
}

function buildURI<T extends ResourceType> (type: T, id: SpotifyID): SpotifyURI<T> {
  return `spotify:${type}:${id}`
}

export {
  buildURI,
  extractID,
  extractType,
}

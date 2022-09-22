export type AlbumID = string
export type ArtistID = string
export type PlaylistID = string
export type TrackID = string

export type SpotifyID = AlbumID | ArtistID | PlaylistID | TrackID

export enum ResourceType {
  Album = 'album',
  Artist = 'artist',
  Playlist = 'playlist',
  Track = 'track',
}

export type SpotifyURI<T extends ResourceType> = `spotify:${T}:${SpotifyID}`

export type AlbumURI = SpotifyURI<ResourceType.Album>
export type ArtistURI = SpotifyURI<ResourceType.Artist>
export type PlaylistURI = SpotifyURI<ResourceType.Playlist>
export type TrackURI = SpotifyURI<ResourceType.Track>

import Album from './Album'
import Artist from './Artist'
import { TrackURI } from './URI'

export default interface Track {
  name: string
  artist: Artist
  album: Album
  uri: TrackURI
}

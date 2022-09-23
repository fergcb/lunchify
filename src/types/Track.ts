import Album from './Album'
import Artist from './Artist'

export default interface Track {
  name: string
  uri: string
  artist: Artist
  album: Album
}

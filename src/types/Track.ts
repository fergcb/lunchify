import Album from './Album'
import Artist from './Artist'

export default interface Song {
  name: string
  artist: Artist
  album: Album
}

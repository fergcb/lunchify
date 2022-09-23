import { TrackURI } from '../types/URI'

export default class Turn {
  // spotify track URI, or null if skipped
  guess: TrackURI | null

  constructor (guess: TrackURI | null) {
    this.guess = guess
  }
}

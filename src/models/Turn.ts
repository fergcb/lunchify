export default class Turn {
  // spotify track URI, or null if skipped
  guess: string | null

  constructor (guess: string | null) {
    this.guess = guess
  }
}

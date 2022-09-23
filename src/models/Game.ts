import { TrackURI } from '../types/URI'
import Turn from './Turn'

export default class Game {
  turns: Turn[]
  targetURI: TrackURI

  constructor (targetURI: TrackURI) {
    this.turns = []
    this.targetURI = targetURI
  }

  addTurn (guess: TrackURI | null): void {
    this.turns.push(new Turn(guess))
  }

  getTurns (): string {
    return this.turns.toString()
  }
}

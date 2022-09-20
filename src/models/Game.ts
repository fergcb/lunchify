import Turn from './Turn'

export default class Game {
  turns: Turn[]
  targetURI: string

  constructor (targetURI: string) {
    this.turns = []
    this.targetURI = targetURI
  }

  addTurn (guess: string | null): void {
    this.turns.push(new Turn(guess))
  }

  getTurns (): string {
    return this.turns.toString()
  }
}

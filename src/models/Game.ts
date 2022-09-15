import Turn from './Turn'

export default class Game {
  turns: Turn[]

  constructor () {
    this.turns = []
  }

  addTurn (guess: string | null): void {
    this.turns.push(new Turn(guess))
  }

  getTurns (): string {
    return this.turns.toString()
  }
}

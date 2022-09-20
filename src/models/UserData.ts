import Game from './Game'

export default class UserData {
  games: Game[]
  currentGame: Game | undefined

  constructor () {
    this.games = []
  }

  setCurrentGame (game: Game): void {
    this.currentGame = game
  }

  saveGames (): void {
    localStorage.setItem('games', JSON.stringify(this.games))
  }

  loadGames (): void {
    const storedGames = localStorage.getItem('games')
    if (storedGames === null) return
    this.games = JSON.parse(storedGames)
  }

  commitCurrentGame (): void {
    if (this.currentGame !== undefined) {
      this.games.push(this.currentGame)
      this.saveGames()
    }
  }
}

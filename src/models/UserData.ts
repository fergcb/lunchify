import Game from './Game'

export default class UserData {
  games: Game[]
  currentGame: Game

  constructor () {
    this.games = []
    this.currentGame = new Game()
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
    this.games.push(this.currentGame)
    this.saveGames()
  }
}

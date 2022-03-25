import GameState from './GameState'
import PlayerState from './PlayerState'
import PlayerView from './PlayerView'

/**
 * In here, you describe what a GameView will look like at any time during a game.
 * It usually derives from the GameState, because only a few properties change.
 */
type GameView = Omit<GameState, 'deck' | 'players'> & {
  deck: number
  players: (PlayerView | PlayerState)[]
}

export default GameView
import PlayerState from './PlayerState'

/**
 * In here, you describe what a GameState will look like at any time during a game.
 */
type GameState = {
  players: PlayerState[]
  deck: number[]
  market: number[]
}

export default GameState
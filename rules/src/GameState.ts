import GameView from './GameView'
import Move from './moves/Move'
import Phase from './Phase'
import PlayerState from './PlayerState'
import PlayerView from './PlayerView'
import ResolveStep from './ResolveStep'

/**
 * In here, you describe what a GameState will look like at any time during a game.
 */
type GameState = {
  players: PlayerState[]
  phase: Phase
  resolveStep?: ResolveStep
  nextMoves: Move[]
  deck: number[]
  market: number[]
}

export default GameState

export function getPlayerState(state: GameState, playerId: number): PlayerState
export function getPlayerState(state: GameState | GameView, playerId: number): PlayerState | PlayerView
export function getPlayerState(state: GameState | GameView, playerId: number) {
  return state.players[playerId - 1]
}
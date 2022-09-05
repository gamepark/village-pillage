import GameState, { getPlayerState } from '../GameState'
import GameView from '../GameView'
import MoveType from './MoveType'

/**
 * An example of a simple move: one player steal a quantity of turnips of his opponent
 */
type StealTurnips = {
  type: MoveType.StealTurnips
  playerId: number
  quantity: number
  victimId: number
}

export default StealTurnips

export function stealTurnipsMove(playerId: number, quantity: number, victimId: number) : StealTurnips {
  return {type: MoveType.StealTurnips, playerId, quantity, victimId}
}

export function stealTurnips(state: GameState | GameView, move: StealTurnips) {
  const player = getPlayerState(state, move.playerId)
  const victim = getPlayerState(state, move.victimId)
  player.stock += move.quantity
  victim.stock -= move.quantity
}

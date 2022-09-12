import GameState, { getPlayerState } from '../GameState'
import GameView from '../GameView'
import MoveType from './MoveType'

/**
 * An example of a simple move: one player spend turnips from his stock
 */
type SpendStockTurnips = {
  type: MoveType.SpendStockTurnips
  playerId: number
  quantity: number
}

export default SpendStockTurnips

export function spendStockTurnipsMove(playerId: number, quantity: number) : SpendStockTurnips {
  return {type: MoveType.SpendStockTurnips, playerId, quantity}
}

export function spendStockTurnips(state: GameState | GameView, move: SpendStockTurnips) {
  const player = getPlayerState(state, move.playerId)
  player.stock -= move.quantity
}

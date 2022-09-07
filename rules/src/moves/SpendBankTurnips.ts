import GameState, { getPlayerState } from '../GameState'
import GameView from '../GameView'
import MoveType from './MoveType'

/**
 * An example of a simple move: one player steal a quantity of turnips of his opponent
 */
type SpendBankTurnips = {
  type: MoveType.SpendBankTurnips
  playerId: number
  quantity: number
}

export default SpendBankTurnips

export function spendBankTurnipsMove(playerId: number, quantity: number) : SpendBankTurnips {
  return {type: MoveType.SpendBankTurnips, playerId, quantity}
}

export function spendBankTurnips(state: GameState | GameView, move: SpendBankTurnips) {
  const player = getPlayerState(state, move.playerId)
  player.bank -= move.quantity
}

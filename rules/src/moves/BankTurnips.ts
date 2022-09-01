import GameState, {getPlayerState} from '../GameState'
import GameView from '../GameView'
import MoveType from './MoveType'

/**
 * An example of a simple move: one player place a quantity of turnips from his stock to his bank
 */
type BankTurnips = {
  type: MoveType.BankTurnips
  playerId: number
  quantity: number
}

export default BankTurnips

export function bankTurnipsMove(playerId: number, quantity: number) : BankTurnips {
  return {type: MoveType.BankTurnips, playerId, quantity}
}

export function bankTurnips(state: GameState | GameView, move: BankTurnips) {
  const player = getPlayerState(state, move.playerId)
  const turnipsSum = player.bank + move.quantity
  if (state.players.length === 2) {
    turnipsSum > 4 ? (player.bank = 4, player.stock = 4-player.bank) : (player.bank += move.quantity, player.stock -= move.quantity)
  } else {
    turnipsSum > 5 ? (player.bank = 5, player.stock = 5-player.bank) : (player.bank += move.quantity, player.stock -= move.quantity)
  }
}

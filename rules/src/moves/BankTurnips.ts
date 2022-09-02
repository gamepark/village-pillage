import GameState, {getPlayerState} from '../GameState'
import GameView from '../GameView'
import PlayerState from '../PlayerState'
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

export function maxBankable(player: PlayerState, players: number) : number {
  const bankSize = players===2 ? 4 : 5
  return bankSize - player.bank
}

export function bankTurnips(state: GameState | GameView, move: BankTurnips) {
  const player = getPlayerState(state, move.playerId)
  player.bank += move.quantity
  player.stock -= move.quantity
}

import GameState, {getPlayerState} from '../GameState'
import GameView from '../GameView'
import MoveType from './MoveType'

/**
 * An example of a simple move: one player returns a quantity of gold to the bank
 */
type GainTurnips = {
  type: MoveType.GainTurnips
  playerId: number
  quantity: number
}

export default GainTurnips

export function gainTurnipsMove(playerId: number, quantity: number) : GainTurnips {
  return {type: MoveType.GainTurnips, playerId, quantity}
}

export function gainTurnips(state: GameState | GameView, move: GainTurnips) {
  const player = getPlayerState(state, move.playerId)
  player.stock += move.quantity
}

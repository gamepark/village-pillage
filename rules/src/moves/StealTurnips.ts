import GameState, {getPlayerState} from '../GameState'
import GameView from '../GameView'
import Side from '../Side'
import MoveType from './MoveType'

/**
 * An example of a simple move: one player steal a quantity of turnips of his opponent
 */
type StealTurnips = {
  type: MoveType.StealTurnips
  playerId: number
  quantity: number
  side : Side
}

export default StealTurnips

export function stealTurnipsMove(playerId: number, quantity: number, side: Side) : StealTurnips {
  return {type: MoveType.StealTurnips, playerId, quantity, side}
}

export function stealTurnips(state: GameState | GameView, move: StealTurnips) {
  const player = getPlayerState(state, move.playerId)

  const leftOpponentId = move.playerId +1 % state.players.length
  move.playerId = leftOpponentId
  const leftOpponent = getPlayerState(state, move.playerId)

  const rightOpponentId = ((move.playerId -2) % state.players.length) + 1
  move.playerId = rightOpponentId
  const rightOpponent = getPlayerState(state, move.playerId)

  if(move.side === Side.RIGHT) {
      (rightOpponent.stock < move.quantity) ? (rightOpponent.stock = 0, player.stock += rightOpponent.stock) 
                                            : (rightOpponent.stock -= move.quantity, player.stock += move.quantity)
  }
  if(move.side === Side.LEFT) {
      (leftOpponent.stock < move.quantity) ? (leftOpponent.stock = 0, player.stock += leftOpponent.stock) 
      : (leftOpponent.stock -= move.quantity, player.stock += move.quantity)
  }
}

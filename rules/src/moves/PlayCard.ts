import GameState, {getPlayerState} from '../GameState'
import GameView from '../GameView'
import Side from '../Side'
import MoveType from './MoveType'

/**
 * An example of a simple move: one player returns a quantity of gold to the bank
 */
type PlayCard = {
  type: MoveType.PlayCard
  playerId: number
  card: number
  side: Side
}

export default PlayCard

export function playCardMove(playerId: number, card: number, side: Side) {
  return {type: MoveType.PlayCard, playerId, card, side}
}

export function playCard(state: GameState | GameView, move: PlayCard) {
  const player = getPlayerState(state, move.playerId)
  player.hand = player.hand.filter(card => card !== move.card)
  if (move.side === Side.LEFT) {
    player.leftCard = move.card
  } else {
    player.rightCard = move.card
  }
}
import Card from '../Card'
import GameState, {getPlayerState} from '../GameState'
import GameView from '../GameView'
import PlayerState from '../PlayerState'
import {isPlayerView} from '../PlayerView'
import Side from '../Side'
import MoveType from './MoveType'

/**
 * An example of a simple move: one player returns a quantity of gold to the bank
 */
type PlayCard = {
  type: MoveType.PlayCard
  playerId: number
  card: Card
  side: Side
}

export default PlayCard

export type PlayCardView = Omit<PlayCard, 'card'>

export function playCardMove(playerId: number, card: Card, side: Side) : PlayCard {
  return {type: MoveType.PlayCard, playerId, card, side}
}

export function playCard(state: GameState, move: PlayCard) : void {
  const player = getPlayerState(state, move.playerId)
  playerPlayCard(player, move)
}

function playerPlayCard(player: PlayerState, move: PlayCard) {
  player.hand = player.hand.filter(card => card !== move.card)
  if (move.side === Side.LEFT) {
    player.leftCard = move.card
  } else {
    player.rightCard = move.card
  }
}

export function playCardInView(state: GameState | GameView, move: PlayCard | PlayCardView) {
  const player = getPlayerState(state, move.playerId)
  if (isPlayerView(player)) {
    player.hand--
    if (move.side === Side.LEFT) {
      player.leftCardPlayed = true
    } else {
      player.rightCardPlayed = true
    }
  } else {
    playerPlayCard(player, move as PlayCard)
  }
}
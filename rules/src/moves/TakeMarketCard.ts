import Card from '../Card'
import GameState, { getPlayerState } from '../GameState'
import GameView from '../GameView'
import { getSpendTurnipsMoves } from '../PlayerState'
import { isPlayerView } from '../PlayerView'
import MoveType from './MoveType'


type TakeMarketCard = {
  type: MoveType.TakeMarketCard
  playerId: number
  card: Card
}

export default TakeMarketCard

export function takeMarketCardMove(playerId: number, card: Card) : TakeMarketCard {
  return {type: MoveType.TakeMarketCard, playerId, card}
}

export function takeMarketCard(state: GameState | GameView, move: TakeMarketCard) {
  const player = getPlayerState(state, move.playerId)
  if (isPlayerView(player)) {
    player.hand++
  } else {
    player.hand.push(move.card)
  }
  state.market.splice(state.market.indexOf(move.card), 1)
  const actionIndex = player.pendingActions.findIndex(action => action.type === MoveType.TakeMarketCard && !action.wait)
  const action = player.pendingActions[actionIndex]
  player.pendingActions.splice(actionIndex, 1)
  state.nextMoves.push(...getSpendTurnipsMoves(player, getPriceToBuyCard(action.card!)))
  // TODO : Draw first card from Deck to emptyMarketPlace
}

export function canTakeMarketCard(state: GameState | GameView, playerId: number) : boolean {
  const player = getPlayerState(state,playerId)
  return player.pendingActions.some(action => action.type === MoveType.TakeMarketCard && !action.wait && !action.card)
}

export function getPriceToBuyCard(card : Card) {
  switch(card) {
    case Card.Merchant: 
    case Card.Cathedral: return 1
    case Card.Innkeeper:
    case Card.Outlaw: return 0
    default: return Infinity
  }
}
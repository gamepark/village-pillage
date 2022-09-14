import Card from '../Card'
import GameState, { getPlayerState } from '../GameState'
import GameView from '../GameView'
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
    state.market.splice(state.market.indexOf(move.card), 1)
    player.hand.push(move.card)
    // TODO : Draw first card from Deck to emptyMarketPlace
  }
}

export function canTakeMarketCard(state: GameState | GameView, playerId: number) : boolean {
  const player = getPlayerState(state,playerId)
  return player.pendingActions.some(action => action.type === MoveType.TakeMarketCard && !action.wait && !action.card)
}

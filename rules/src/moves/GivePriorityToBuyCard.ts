import GameState, { getPlayerState } from '../GameState'
import GameView from '../GameView'
import MoveType from './MoveType'


type GivePriorityToBuyCard = {
  type: MoveType.GivePriorityToBuyCard
  playerId: number
}

export default GivePriorityToBuyCard

export function givePriorityToBuyCardMove(playerId: number) : GivePriorityToBuyCard {
  return {type: MoveType.GivePriorityToBuyCard, playerId}
}

export function givePriorityToBuyCard(state: GameState | GameView, move: GivePriorityToBuyCard) {
  const player = getPlayerState(state, move.playerId)
  const action = player.pendingActions.find(action => action.type === MoveType.TakeMarketCard)!
  delete action.wait
}

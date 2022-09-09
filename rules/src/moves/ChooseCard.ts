import Card from '../Card'
import GameState, { getPlayerState } from '../GameState'
import GameView from '../GameView'
import MoveType from './MoveType'


type ChooseCard = {
  type: MoveType.ChooseCard
  playerId: number
  card: Card
}

export default ChooseCard


export function chooseCardMove(playerId: number, card: Card) : ChooseCard {
  return {type: MoveType.ChooseCard, playerId, card}
}

export function chooseCard(state: GameState | GameView, move: ChooseCard) : void {
  const player = getPlayerState(state, move.playerId)
  console.log(player)
}

export function canChooseCard(state: GameState | GameView, playerId: number) : boolean {
  const player = getPlayerState(state,playerId)
  return player.pendingActions.some(action => action.type === MoveType.ChooseCard && !action.wait)
}
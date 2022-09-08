import Card from '../Card'
import GameState, {getPlayerState} from '../GameState'
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
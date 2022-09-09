import Card from '../Card'
import CardColor, { getCardColor } from '../CardColor'
import EffectType from '../EffectType'
import GameState, {getPlayerState} from '../GameState'
import GameView from '../GameView'
import Phase from '../Phase'
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
  if (state.phase === Phase.RESOLVE && state.resolveStep?.cardColor === CardColor.Yellow && state.resolveStep.effectType === EffectType.Buy) {
    const player = getPlayerState(state,playerId)
    if (getCardColor(player.leftCard!) === CardColor.Yellow && getCardColor(player.rightCard!) === CardColor.Yellow) {
      return true
    }
  } 
  return false
}
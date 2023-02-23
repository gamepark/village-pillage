import CardColor, { getCardColor } from '../CardColor'
import EffectType from '../EffectType'
import GameState from '../GameState'
import GameView from '../GameView'
import Phase from '../Phase'
import ResolveStep from '../ResolveStep'
import MoveType from './MoveType'

/**
 * An example of a complex move: a state move about phase resolution for AutomaticMoves.
 */
type ChangeResolveStep = {
  type: MoveType.ChangeResolveStep
}

export default ChangeResolveStep

export const changeResolveStepMove : ChangeResolveStep = {type: MoveType.ChangeResolveStep}

export function changeResolveStep(state: GameState | GameView) {
  state.resolveStep = getNextResolveStep(state.resolveStep)
  if (!state.resolveStep) {state.phase = Phase.REFRESH}                                     // On a finit le cycle de getNextResolveStep()
  else if (state.resolveStep.effectType === EffectType.Buy && state.resolveStep.cardColor === CardColor.Yellow) {
    for (const player of state.players) {                                                   // Controle du double cas que dans le cas de JAUNE et BUY a priori
      if (getCardColor(player.leftCard!) === CardColor.Yellow && getCardColor(player.rightCard!) === CardColor.Yellow) {
        player.pendingActions.push({type: MoveType.ChooseCard})
      }
    }
  }
}

export function getNextResolveStep(resolveStep?: ResolveStep) : ResolveStep | undefined {
  if (resolveStep===undefined) {
    return {cardColor: CardColor.Green, effectType: EffectType.Gain}                        // Init à Green et Gain
  } else if(resolveStep.effectType !== EffectType.Buy) {                                    // EffectType suivant avant d'aller à ..
    return {cardColor: resolveStep.cardColor, effectType: resolveStep.effectType +1}        // ..CardColor suivante
  } else if(resolveStep.cardColor !== CardColor.Yellow) {
    return {cardColor: resolveStep.cardColor +1, effectType: EffectType.Gain}
  } else {
    return undefined
  }

}

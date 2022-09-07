import CardColor from '../CardColor'
import EffectType from '../EffectType'
import GameState from '../GameState'
import GameView from '../GameView'
import Phase from '../Phase'
import ResolveStep from '../ResolveStep'
import MoveType from './MoveType'

/**
 * An example of a simple move: one player returns a quantity of gold to the bank
 */
type ChangeResolveStep = {
  type: MoveType.ChangeResolveStep
}

export default ChangeResolveStep

export const changeResolveStepMove : ChangeResolveStep = {type: MoveType.ChangeResolveStep}

export function changeResolveStep(state: GameState | GameView) {
  state.resolveStep = getNextResolveStep(state.resolveStep)
  if (!state.resolveStep) {state.phase = Phase.REFRESH}
}

export function getNextResolveStep(resolveStep?: ResolveStep) : ResolveStep | undefined {
  if (resolveStep===undefined) {
    return {cardColor: CardColor.Green, effectType: EffectType.Gain}                        // Init à Green et Gain
  } else if(resolveStep.effectType !== EffectType.Buy) {                                    // EffectType suivant avant de..
    return {cardColor: resolveStep.cardColor, effectType: resolveStep.effectType +1}        // ..CardColor suivante
  } else if(resolveStep.cardColor !== CardColor.Yellow) {
    return {cardColor: resolveStep.cardColor +1, effectType: EffectType.Gain}
  } else {
    return undefined
  }

}

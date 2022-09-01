import CardColor from '../CardColor'
import GameState from '../GameState'
import GameView from '../GameView'
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
}

export function getNextResolveStep(resolveStep?: CardColor) {
  return resolveStep===undefined ? CardColor.Green : resolveStep +1
}

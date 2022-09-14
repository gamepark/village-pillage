import GameState, {getPlayerState} from '../GameState'
import GameView from '../GameView'
import PendingAction from '../PendingAction'
import MoveType from './MoveType'


type AddPendingAction = {
  type: MoveType.AddPendingAction
  playerId: number
  action: PendingAction
}

export default AddPendingAction

export function addPendingActionMove(playerId: number, action: PendingAction) : AddPendingAction {
  return {type: MoveType.AddPendingAction, playerId, action}
}

export function addPendingAction(state: GameState | GameView, move: AddPendingAction) {
  const player = getPlayerState(state, move.playerId)
  player.pendingActions.push(move.action)
}

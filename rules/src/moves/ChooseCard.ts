import Card from '../material/Card'
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

// export function chooseCard(state: GameState | GameView, move: ChooseCard) : void {
//   const player = getPlayerState(state, move.playerId)
//   state.nextMoves.push(...getCardBuyMoves(player, move.card, getRelicsPrice(state)))
//   const actionIndex = player.pendingActions.findIndex(action => !action.wait && action.type === MoveType.ChooseCard)
//   if (actionIndex != -1) {
//     const action = player.pendingActions[actionIndex]
//     player.pendingActions.splice(actionIndex, 1)    // enlève la pendingAction : la nettoyer
//     if (!action.card) {
//       player.pendingActions.push({type: MoveType.ChooseCard, card: player.leftCard === move.card ? player.rightCard : player.leftCard}) // Se servir des pendingActions pour dire qu'il faudra jouer la seconde carte
//     }
//   }
// }

export function canChooseCard(state: GameState | GameView, playerId: number) : boolean {
  const player = getPlayerState(state,playerId)
  return player.pendingActions.some(action => action.type === MoveType.ChooseCard && !action.wait && !action.card)
}
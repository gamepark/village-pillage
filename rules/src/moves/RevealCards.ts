import GameState from '../GameState'
import GameView from '../GameView'
import Phase from '../Phase'
import MoveType from './MoveType'

type RevealCards = {
  type: MoveType.RevealCards
}

export default RevealCards

export type RevealCardsView = RevealCards & {
  players: { leftCard: number, rightCard: number }[]
}

export const revealCardsMove: RevealCards = {type: MoveType.RevealCards}

export function revealCards(state: GameState) {
  state.phase = Phase.RESOLVE
}

export function revealCardsInView(state: GameView, move: RevealCardsView) {
  for (let i = 0; i < state.players.length; i++){
    const player = state.players[i]
    player.leftCard = move.players[i].leftCard
    player.rightCard = move.players[i].rightCard
  }
  state.phase = Phase.RESOLVE
}

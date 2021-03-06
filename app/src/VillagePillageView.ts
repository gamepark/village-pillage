import {Game} from '@gamepark/rules-api'
import GameView from '@gamepark/village-pillage/GameView'
import MoveType from '@gamepark/village-pillage/moves/MoveType'
import MoveView from '@gamepark/village-pillage/moves/MoveView'
import {playCardInView} from '@gamepark/village-pillage/moves/PlayCard'
import {revealCardsInView} from '@gamepark/village-pillage/moves/RevealCards'

/**
 * This class is useful when the game has "IncompleteInformation" (or "SecretInformation").
 * It allows to handle, in a different way than the backend side, the moves that involve hidden information.
 */
export default class VillagePillageView implements Game<GameView, MoveView> {
  state: GameView

  constructor(state: GameView) {
    this.state = state
  }

  /**
   * In this method, inside the view, we must return any move that the frontend can fully anticipate.
   * The reason why it should be anticipated instead of waiting for the backend to provide with all the automatic consequences is latency.
   * If the backend takes time to reply, maybe we will have the reply while we are animating the first consequences. The player won't notice the latency!
   *
   * @return A MoveView which can be completely anticipated by the player or the spectator
   */
  getAutomaticMove(): void | MoveView {
    return
  }

  /**
   * This is where a move is reproduced on the browser of a player. Most move will be treated the exact same way on both server and client side,
   * however some moves, that involved hiding information or discovering hidden information, will receive a different treatment than in the main rules class.
   *
   * @param move The move that must be applied in the browser of the player or the spectator
   */
  play(move: MoveView): void {
    switch (move.type) {
      case MoveType.PlayCard:
        return playCardInView(this.state, move)
      case MoveType.RevealCards:
        return revealCardsInView(this.state, move)
    }
  }

}
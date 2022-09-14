import {Game} from '@gamepark/rules-api'
import GameView from '@gamepark/village-pillage/GameView'
import { addPendingAction } from '@gamepark/village-pillage/moves/AddPendingAction'
import { bankTurnips } from '@gamepark/village-pillage/moves/BankTurnips'
import { changeResolveStep } from '@gamepark/village-pillage/moves/ChangeResolveStep'
import { chooseCard } from '@gamepark/village-pillage/moves/ChooseCard'
import { gainTurnips } from '@gamepark/village-pillage/moves/GainTurnips'
import { givePriorityToBuyCard } from '@gamepark/village-pillage/moves/GivePriorityToBuyCard'
import MoveType from '@gamepark/village-pillage/moves/MoveType'
import MoveView from '@gamepark/village-pillage/moves/MoveView'
import {playCardInView} from '@gamepark/village-pillage/moves/PlayCard'
import {revealCardsInView} from '@gamepark/village-pillage/moves/RevealCards'
import { spendBankTurnips } from '@gamepark/village-pillage/moves/SpendBankTurnips'
import { spendStockTurnips } from '@gamepark/village-pillage/moves/SpendStockTurnips'
import { stealTurnips } from '@gamepark/village-pillage/moves/StealTurnips'
import { takeRelic } from '@gamepark/village-pillage/moves/TakeRelic'

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
  getAutomaticMoves(): MoveView[] {
    return []
  }

  /**
   * This is where a move is reproduced on the browser of a player. Most move will be treated the exact same way on both server and client side,
   * however some moves, that involved hiding information or discovering hidden information, will receive a different treatment than in the main rules class.
   *
   * @param move The move that must be applied in the browser of the player or the spectator
   */
  play(move: MoveView): void {
    if (this.state.nextMoves.length && this.state.nextMoves[0].type === move.type) {
      this.state.nextMoves.shift()
    }
    switch (move.type) {
      case MoveType.PlayCard:
        playCardInView(this.state, move)
        break
      case MoveType.RevealCards:
        revealCardsInView(this.state, move)
        break
      case MoveType.GainTurnips:
        gainTurnips(this.state, move)
        break
      case MoveType.ChangeResolveStep:
        changeResolveStep(this.state)
        break
      case MoveType.StealTurnips:
        stealTurnips(this.state, move)
        break
      case MoveType.BankTurnips:
        bankTurnips(this.state, move)
        break
      case MoveType.SpendStockTurnips:
        spendStockTurnips(this.state, move)
        break
      case MoveType.SpendBankTurnips:
        spendBankTurnips(this.state, move)
        break
      case MoveType.ChooseCard:
        chooseCard(this.state,move)
        break
      case MoveType.TakeRelic:
        takeRelic(this.state, move)
        break
      case MoveType.AddPendingAction:
        addPendingAction(this.state, move)
        break
      case MoveType.GivePriorityToBuyCard:
        givePriorityToBuyCard(this.state, move)
        break
    }
  }

}
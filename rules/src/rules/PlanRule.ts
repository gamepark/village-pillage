import { MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { PlayerId } from '../VillagePillageOptions'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import Side from './Side'
import { RuleId } from './RuleId'

export class PlanRule extends SimultaneousRule {

  getLegalMoves(playerId: PlayerId){

    if (!this.isTurnToPlay(playerId)) {
      return []
    }

    const planedCards = this
      .material(MaterialType.Card)
      .location(LocationType.PlanedCard)
      .player(playerId)

    if (planedCards.length === 2) {
      return [this.rules().endPlayerTurn(playerId)]
    }

    const left = planedCards.locationId(Side.Left)
    const moves = []
    if (!left.length) {
      moves.push(
        ...this.getPlayerHand(playerId)
          .moveItems({ location: { id: Side.Left, type: LocationType.PlanedCard, player: playerId }})
      )
    }

    const right = planedCards.locationId(Side.Right)
    if (!right.length) {
      moves.push(
        ...this.getPlayerHand(playerId)
          .moveItems({ location: { id: Side.Right, type: LocationType.PlanedCard, player: playerId }})
      )
    }

    return moves
  }

  getPlayerHand(playerId: PlayerId) {
    return this.material(MaterialType.Card).location(LocationType.Hand).player(playerId)
  }

  getMovesAfterPlayersDone(): MaterialMove<number, number, number>[] {
    return [this.rules().startRule(RuleId.Reveal)]
  }
}
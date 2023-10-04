import { MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { PlayerId } from '../VillagePillageOptions'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import Side from './Side'
import { RuleId } from './RuleId'
import { Memory } from './Memory'
import CardType from '../CardType'

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

    const left = planedCards.locationId(Side.LEFT)
    const moves = []
    if (!left.length) {
      moves.push(
        ...this.getPlayerHand(playerId)
          .moveItems({ location: { id: Side.LEFT, type: LocationType.PlanedCard, player: playerId }})
      )
    }

    const right = planedCards.locationId(Side.RIGHT)
    if (!right.length) {
      moves.push(
        ...this.getPlayerHand(playerId)
          .moveItems({ location: { id: Side.RIGHT, type: LocationType.PlanedCard, player: playerId }})
      )
    }

    return moves
  }

  getPlayerHand(playerId: PlayerId) {
    return this.material(MaterialType.Card).location(LocationType.Hand).player(playerId)
  }

  getMovesAfterPlayersDone(): MaterialMove<number, number, number>[] {
    this.memorize(Memory.CardType, CardType.Farm)
    return [this.rules().startPlayerTurn(RuleId.Gain, this.game.players[0])]
  }
}
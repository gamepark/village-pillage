import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { RuleId } from './RuleId'
import { Memory } from './Memory'
import { PlayerId } from '../VillagePillageOptions'
import Side from './Side'

export class RefreshRule extends MaterialRulesPart {
  onRuleStart() {
    const moves: MaterialMove[] = []

    const retrieveExhaustedCards: MaterialMove[] = this
      .material(MaterialType.Card)
      .location(LocationType.ExhaustCard)
      .moveItems((item) => ({
        location: {
          type: LocationType.Hand,
          player: item.location.player,
        },
      }))
    moves.push(...retrieveExhaustedCards)


    const refreshedCards: MaterialMove[] = this.material(MaterialType.Card)
      .location(LocationType.PlanedCard)
      .filter((item) => !this.isTwoPlayerGame || item.location.id === Side.Left)
      .moveItems((item) => {
        const player = item.location.player!
        return ({
          location: {
            type: this.isExhausted(player, item.location.id) ? LocationType.ExhaustCard : LocationType.Hand,
            player,
          },
        })
      })
    moves.push(...refreshedCards)

    if (this.isTwoPlayerGame) {
      const movePlanedCards = this.material(MaterialType.Card)
        .location(LocationType.PlanedCard)
        .filter((item) => item.location.id === Side.Right)
        .moveItems((item) => ({
          location: {
            ...item.location,
            id: Side.Left,
          },
        }))
      moves.push(...movePlanedCards)
    }

    this.game.players.forEach((player) => this.forget(Memory.ExhaustedSides, player))
    this.forget(Memory.CardColor)
    moves.push(this.rules().startSimultaneousRule(RuleId.Plan, this.game.players))
    return moves
  }

  get isTwoPlayerGame() {
    return this.game.players.length === 2
  }

  isExhausted(player: PlayerId, side: Side) {
    return (this.remind(Memory.ExhaustedSides, player) ?? []).includes(side)
  }
}
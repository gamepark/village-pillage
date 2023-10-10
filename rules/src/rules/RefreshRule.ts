import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { RuleId } from './RuleId'
import { Memory } from './Memory'
import { PlayerId } from '../VillagePillageOptions'
import Side from './Side'

export class RefreshRule extends MaterialRulesPart {
  onRuleStart() {
    const retrieveExhaustedCards: MaterialMove[] = this
      .material(MaterialType.Card)
      .location(LocationType.ExhaustCard)
      .moveItems((item) => ({
        location: {
          type: LocationType.Hand,
          player: item.location.player
        }
      }))


    const refreshedCards: MaterialMove[] = this.material(MaterialType.Card)
      .location(LocationType.PlanedCard)
      .moveItems((item) => {
        const player = item.location.player!
        return ({
          location: {
            type: this.isExhausted(player, item.location.id)? LocationType.ExhaustCard: LocationType.Hand,
            player,
          },
        })
      })

    this.game.players.forEach((player) => this.forget(Memory.ExhaustedSides, player))
    this.forget(Memory.CardColor)
    return [
      ...retrieveExhaustedCards,
      ...refreshedCards,
      this.rules().startSimultaneousRule(RuleId.Plan, this.game.players)
    ]
  }

  isExhausted(player: PlayerId, side: Side) {
    return (this.remind(Memory.ExhaustedSides, player) ?? []).includes(side)
  }
}
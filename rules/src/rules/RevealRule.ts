import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { RuleId } from './RuleId'
import { Memory } from './Memory'
import CardColor from '../CardColor'

export class RevealRule extends MaterialRulesPart {
  onRuleStart() {
    const moves: MaterialMove[] = []
    moves.push(
      ...this
        .material(MaterialType.Card)
        .location(LocationType.PlanedCard)
        .moveItems({ rotation: { y: 1 } })
    )

    this.memorize(Memory.CardColor, CardColor.Green)
    moves.push(this.rules().startRule(RuleId.Gain))
    return moves
  }
}
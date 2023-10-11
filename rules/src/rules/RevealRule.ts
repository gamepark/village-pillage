import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { RuleId } from './RuleId'
import { Memory } from './Memory'
import CardColor from '../CardColor'
import Side from './Side'

export class RevealRule extends MaterialRulesPart {
  onRuleStart() {
    const moves: MaterialMove[] = []
    moves.push(
      ...this
        .material(MaterialType.Card)
        .location(LocationType.PlanedCard)
        .filter((item) => !this.isTwoPlayerGame || item.location.id === Side.Left)
        .moveItems({ rotation: { y: 1 } })
    )

    this.memorize(Memory.CardColor, CardColor.Green)
    moves.push(this.rules().startRule(RuleId.Gain))
    return moves
  }

  get isTwoPlayerGame() {
    return this.game.players.length === 2
  }
}
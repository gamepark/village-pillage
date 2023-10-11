import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { CardColor, getCardColor } from '../material/Card'
import { Memory } from './Memory'
import { RuleId } from './RuleId'
import Side from './Side'
import { Gain } from './helper/Gain'

export class GainRule extends MaterialRulesPart {
  onRuleStart(): MaterialMove<number, number, number>[] {
    const cardColor = this.cardColor
    const planedCards = this
      .material(MaterialType.Card)
      .location(LocationType.PlanedCard)
      .filter((item) => !this.isTwoPlayerGame || item.location.id === Side.Left)
      .filter((item) => getCardColor(item.id) === cardColor)
      .getItems()

    const moves: MaterialMove[] = planedCards.flatMap((item) => new Gain(this.game, item).turnipsMoves)
    moves.push(this.rules().startRule(RuleId.Steal))
    return moves
  }

  get cardColor() {
    return this.remind<CardColor>(Memory.CardColor)
  }

  get isTwoPlayerGame() {
    return this.game.players.length === 2
  }
}
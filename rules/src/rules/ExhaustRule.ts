import { MaterialItem, MaterialRulesPart } from '@gamepark/rules-api'
import { Memory } from './Memory'
import { MaterialType } from '../material/MaterialType'
import { Resolution } from './helper/Resolution'
import { RuleId } from './RuleId'
import { ExhaustEffect } from './helper/ExhaustEffect'
import { LocationType } from '../material/LocationType'
import { getCardColor } from '../material/Card'
import CardColor from '../CardColor'
import { getCardRules } from '../cards/getCardRules'

export class ExhaustRule extends MaterialRulesPart {
  onRuleStart() {
    const planedCards = this
      .material(MaterialType.Card)
      .location(LocationType.PlanedCard)
      .filter((item) => this.isCurrentColor(item))
      .getItems()

    const exhaustedItems: MaterialItem[] = []
    for (const item of planedCards) {
      const rule = getCardRules(this.game, item.id)
      const resolution = new Resolution(this.game, item.location.id, item.location.player!)
      if (rule.isExhaustItself(item)) exhaustedItems.push(resolution.card)
      if (rule.isExhaustCard(item)) exhaustedItems.push(resolution.opponentCard.getItem()!)
    }

    new ExhaustEffect(this.game).exhaust(exhaustedItems)
    return [this.rules().startRule(RuleId.SelectNextBuyPlayer)]
  }

  isCurrentColor(item: MaterialItem) {
    return getCardColor(item.id) === this.cardColor
  }

  get cardColor() {
    return this.remind<CardColor>(Memory.CardColor)
  }
}
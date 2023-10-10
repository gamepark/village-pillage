import { Material, MaterialRulesPart } from '@gamepark/rules-api'
import { Memory } from '../Memory'

export class CardExhauster extends MaterialRulesPart {
  exhaust(card: Material) {
    const item = card.getItem()!
    this.memorize(Memory.ExhaustedSides, (sides) => {
      const exhausted = sides ?? []
      exhausted.push(item.location.id)
      return exhausted
    }, item.location.player)
  }
}
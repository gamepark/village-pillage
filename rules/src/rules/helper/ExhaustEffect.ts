import { MaterialItem, MaterialRulesPart } from '@gamepark/rules-api'
import { Memory } from '../Memory'

export class ExhaustEffect extends MaterialRulesPart {
  exhaust(items: MaterialItem[]) {
    items.forEach((item) => {
      this.memorize(Memory.ExhaustedSides, (sides) => {
        return [
          ...(sides ?? []),
          item.location.id
        ]
      }, item.location.player)
    })
  }
}
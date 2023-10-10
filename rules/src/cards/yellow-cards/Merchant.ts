import CardRules from '../CardRules'
import { PlayerId } from '../../VillagePillageOptions'
import { Material, MaterialMove } from '@gamepark/rules-api'
import { RuleId } from '../../rules/RuleId'

export default class Merchant extends CardRules {
  canBuyRelic = true
  priceToBuyCard = 1

  getAlternativeMoves(_player: PlayerId, _opponentCard: Material, turnips: number): MaterialMove[] {
    if (this.priceToBuyCard > turnips) return []
    return [this.rules().startRule(RuleId.BuyMarketCard)]
  }
}
import CardRules from '../CardRules'
import { PlayerId } from '../../VillagePillageOptions'
import { Material, MaterialMove } from '@gamepark/rules-api'
import { RuleId } from '../../rules/RuleId'
import { MaterialType } from '../../material/MaterialType'
import { LocationType } from '../../material/LocationType'

export default class Merchant extends CardRules {
  canBuyRelic = true
  priceToBuyCard = 1

  getAlternativeMoves(_player: PlayerId, _opponentCard: Material, turnips: number): MaterialMove[] {
    if (this.priceToBuyCard > turnips || !this.marketDeck.length) return []
    return [this.rules().startRule(RuleId.BuyMarketCard)]
  }

  get marketDeck() {
    return this.material(MaterialType.Card).location(LocationType.MarketDeck)
  }
}
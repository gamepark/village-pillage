import CardType, { getCardType } from '../../CardType'
import CardRules from '../CardRules'
import { MaterialItem } from '@gamepark/rules-api'

export default class Outlaw extends CardRules {
  priceToBuyCard = 0

  getSteal(opponentCard: MaterialItem): number {
    const type = getCardType(opponentCard.id)
    return type === CardType.Farm ? 5 : (type === CardType.Merchant ? 4 : 0)
  }
}
import CardType, { getCardType } from '../../CardType'
import CardRules from '../CardRules'
import { MaterialItem } from '@gamepark/rules-api'

export default class Cathedral extends CardRules {
  priceToBuyCard = 1

  getStealToOpponent(opponentCard: MaterialItem): number {
    const type = getCardType(opponentCard.id)
    return type === CardType.Raider ? 3 : 0
  }

  getBank(opponentCard: MaterialItem): number {
    const type = getCardType(opponentCard.id)
    return type === CardType.Raider ? 1 : 0
  }
}
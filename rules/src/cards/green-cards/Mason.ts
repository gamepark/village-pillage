import CardType, { getCardType } from '../../CardType'
import CardRules from '../CardRules'
import { MaterialItem } from '@gamepark/rules-api'

export default class Mason extends CardRules {
  gain = 4

  getSteal(opponentCard: MaterialItem): number {
    const type = getCardType(opponentCard.id)
    return type === CardType.Wall ? 1 : 0
  }

  getBank(opponentCard: MaterialItem): number {
    const type = getCardType(opponentCard.id)
    return type === CardType.Wall ? 2 : 0
  }
}
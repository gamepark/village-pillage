import CardType, { getCardType } from '../../CardType'
import CardRules from '../CardRules'
import { MaterialItem } from '@gamepark/rules-api'

export default class Trapper extends CardRules {
  getGain(opponentCard: MaterialItem): number {
    const type = getCardType(opponentCard.id)
    return (type === CardType.Farm || type === CardType.Merchant) ? 1 : 0
  }

  getSteal(opponentCard: MaterialItem): number {
    const type = getCardType(opponentCard.id)
    return (type === CardType.Farm || type === CardType.Merchant) ? 4 : (type === CardType.Raider ? 1 : 0)
  }
}
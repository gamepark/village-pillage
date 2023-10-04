import CardType, { getCardType } from '../../CardType'
import CardRules from '../CardRules'
import { MaterialItem } from '@gamepark/rules-api'

export default class Moat extends CardRules {
  getGain(opponentCard: MaterialItem): number {
    const type = getCardType(opponentCard.id)
    return type === CardType.Raider ? 2 : 0
  }

  getOpponentGain(opponentCard: MaterialItem): number {
    const type = getCardType(opponentCard.id)
    return type === CardType.Farm ? 1 : 0
  }

  getSteal(opponentCard: MaterialItem): number {
    const type = getCardType(opponentCard.id)
    return type === CardType.Raider ? 3 : 0
  }

  getBank(opponentCard: MaterialItem): number {
    const type = getCardType(opponentCard.id)
    return (type === CardType.Wall || type === CardType.Merchant) ? 2 : 0
  }
}
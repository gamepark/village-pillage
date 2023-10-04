import CardType, { getCardType } from '../../CardType'
import CardRules from '../CardRules'
import { MaterialItem } from '@gamepark/rules-api'

export default class Treasury extends CardRules {
  bank = 4

  getGain(opponentCard: MaterialItem): number {
    const type = getCardType(opponentCard.id)
    return type === CardType.Raider ? 0 : 1
  }

  getSteal(opponentCard: MaterialItem): number {
    const type = getCardType(opponentCard.id)
    return type === CardType.Raider ? 2 : 0
  }
}
import CardType, { getCardType } from '../../CardType'
import CardRules from '../CardRules'
import { MaterialItem } from '@gamepark/rules-api'

export default class Farmer extends CardRules {
  gain = 4

  getBank(opponentCard: MaterialItem): number {
    const type = getCardType(opponentCard.id)
    return type === CardType.Raider ? 0 : 2
  }
}
import CardType, { getCardType } from '../../CardType'
import CardRules from '../CardRules'
import { MaterialItem } from '@gamepark/rules-api'

export default class Labyrinth extends CardRules {
  getGain(opponentCard: MaterialItem): number {
    const type = getCardType(opponentCard.id)
    return type === CardType.Raider ? 0 : 1
  }

  getSteal(opponentCard: MaterialItem): number {
    const type = getCardType(opponentCard.id)
    return type === CardType.Raider ? 3 : 0
  }

  getBank(opponentCard: MaterialItem): number {
    const type = getCardType(opponentCard.id)
    return type === CardType.Raider ? 0 : 2
  }
}
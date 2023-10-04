import CardType, { getCardType } from '../../CardType'
import CardRules from '../CardRules'
import { MaterialItem } from '@gamepark/rules-api'

export default class Dungeon extends CardRules{
  getGain(opponentCard: MaterialItem): number {
        const type = getCardType(opponentCard.id)
        return type === CardType.Raider ? 0 : 1
    }

  getSteal(opponentCard: MaterialItem): number {
        const type = getCardType(opponentCard.id)
        return (type === CardType.Raider || type === CardType.Wall) ? 1 : 0
    }

  getBank(opponentCard: MaterialItem): number {
        const type = getCardType(opponentCard.id)
        return (type === CardType.Raider || type === CardType.Wall) ? 1 : 2
    }
}
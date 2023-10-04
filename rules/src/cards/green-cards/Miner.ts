import CardType, { getCardType } from '../../CardType'
import CardRules from '../CardRules'
import { MaterialItem } from '@gamepark/rules-api'

export default class Miner extends CardRules {
  getGain(opponentCard: MaterialItem): number {
    const type = getCardType(opponentCard.id)
    return type === CardType.Wall ? 5 : 4
  }
}
import CardType, { getCardType } from '../../CardType'
import CardRules from '../CardRules'
import { MaterialItem } from '@gamepark/rules-api'

export default class TollBridge extends CardRules {
  // TODO : Peut voler dans la banque !
  getSteal(opponentCard: MaterialItem): number {
    const type = getCardType(opponentCard.id)
    return (type === CardType.Raider || type === CardType.Merchant) ? 2 : 0
  }

  getBank(opponentCard: MaterialItem): number {
    const type = getCardType(opponentCard.id)
    return (type === CardType.Farm || type === CardType.Wall) ? 2 : 0
  }
}
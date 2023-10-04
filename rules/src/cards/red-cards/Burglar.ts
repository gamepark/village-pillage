import CardType, { getCardType } from '../../CardType'
import CardRules from '../CardRules'
import { MaterialItem } from '@gamepark/rules-api'

export default class Burglar extends CardRules {
  // TODO : Peut voler dans la banque !
  getSteal(opponentCard: MaterialItem): number {
    const type = getCardType(opponentCard.id)
    return (type === CardType.Farm || type === CardType.Merchant) ? 4 : 0
  }
}
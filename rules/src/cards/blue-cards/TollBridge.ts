import CardColor, { getCardColor } from '../../CardColor'
import CardRules from '../CardRules'
import { MaterialItem } from '@gamepark/rules-api'

export default class TollBridge extends CardRules {
  // TODO : Peut voler dans la banque !
  getSteal(opponentCard: MaterialItem): number {
    if (this.isRefresh) return 0
    const type = getCardColor(opponentCard.id)
    return (type === CardColor.Red || type === CardColor.Yellow) ? 2 : 0
  }

  getBank(opponentCard: MaterialItem): number {
    if (this.isRefresh) return 0
    const type = getCardColor(opponentCard.id)
    return (type === CardColor.Green || type === CardColor.Blue) ? 2 : 0
  }
}
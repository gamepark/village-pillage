import CardRules from '../CardRules'
import { MaterialItem } from '@gamepark/rules-api'
import { CardColor, getCardColor } from '../../material/Card'

export default class Veteran extends CardRules {
  getSteal(opponentCard: MaterialItem): number {
    if (this.isRefresh) return 0
    const type = getCardColor(opponentCard.id)
    return (type === CardColor.Green || type === CardColor.Yellow) ? 6 : 0
  }

  isExhaustItself(opponentCard: MaterialItem) {
    if (this.isRefresh) return false
    const type = getCardColor(opponentCard.id)
    return (type === CardColor.Green || type === CardColor.Yellow)
  }
}
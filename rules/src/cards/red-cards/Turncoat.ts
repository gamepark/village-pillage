import { CardColor, getCardColor } from '../../material/Card'
import CardRules from '../CardRules'
import { MaterialItem } from '@gamepark/rules-api'

export default class Turncoat extends CardRules {
  getSteal(opponentCard: MaterialItem): number {
    if (this.isRefresh) return 0
    const type = getCardColor(opponentCard.id)
    return (type === CardColor.Green || type === CardColor.Yellow) ? 6 : 0
  }

  isExchangeCards(opponentCard: MaterialItem): boolean {
    if (!this.isRefresh) return false
    const type = getCardColor(opponentCard.id)
    return type === CardColor.Red
  }
}
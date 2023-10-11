import { CardColor, getCardColor } from '../../material/Card'
import CardRules from '../CardRules'
import { MaterialItem } from '@gamepark/rules-api'

export default class Cathedral extends CardRules {
  priceToBuyCard = 1

  getStealToOpponent(opponentCard: MaterialItem): number {
    if (this.isRefresh) return 0
    const type = getCardColor(opponentCard.id)
    return type === CardColor.Red ? 3 : 0
  }

  getBank(opponentCard: MaterialItem): number {
    if (this.isRefresh) return 0
    const type = getCardColor(opponentCard.id)
    return type === CardColor.Red ? 1 : 0
  }

  canBuyCard(opponentCard: MaterialItem): boolean {
    if (this.isRefresh) return false
    const type = getCardColor(opponentCard.id)
    return type !== CardColor.Red
  }
}
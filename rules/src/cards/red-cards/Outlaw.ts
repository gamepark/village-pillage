import { CardColor, getCardColor } from '../../material/Card'
import CardRules from '../CardRules'
import { MaterialItem } from '@gamepark/rules-api'

export default class Outlaw extends CardRules {
  priceToBuyCard = 0

  getSteal(opponentCard: MaterialItem): number {
    if (this.isRefresh) return 0
    const type = getCardColor(opponentCard.id)
    return type === CardColor.Green ? 5 : (type === CardColor.Yellow ? 4 : 0)
  }

  canBuyCard(opponentCard: MaterialItem): boolean {
    if (this.isRefresh) return false
    const type = getCardColor(opponentCard.id)
    return type === CardColor.Yellow
  }
}
import { CardColor, getCardColor } from '../../material/Card'
import CardRules from '../CardRules'
import { MaterialItem } from '@gamepark/rules-api'

export default class Florist extends CardRules {
  gain = 5

  getStealToOpponent(opponentCard: MaterialItem): number {
    if (this.isRefresh) return 0
    const type = getCardColor(opponentCard.id)
    return type === CardColor.Red ? 2 : 0
  }
}
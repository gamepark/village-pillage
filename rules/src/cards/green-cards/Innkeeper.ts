import CardColor, { getCardColor } from '../../CardColor'
import CardRules from '../CardRules'
import { MaterialItem } from '@gamepark/rules-api'

export default class Innkeeper extends CardRules {
  priceToBuyCard = 0

  getGain(opponentCard: MaterialItem): number {
    if (this.isRefresh) return 0
    const type = getCardColor(opponentCard.id)
    return type === CardColor.Yellow ? 5 : 4
  }
}
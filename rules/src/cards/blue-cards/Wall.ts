import CardColor, { getCardColor } from '../../CardColor'
import CardRules from '../CardRules'
import { MaterialItem } from '@gamepark/rules-api'

export default class Wall extends CardRules {
  bank = 1

  getGain(opponentCard: MaterialItem): number {
    if (this.isRefresh) return 0
    const type = getCardColor(opponentCard.id)
    return type === CardColor.Red ? 0 : 1
  }

  getSteal(opponentCard: MaterialItem): number {
    if (this.isRefresh) return 0
    const type = getCardColor(opponentCard.id)
    return type === CardColor.Red ? 1 : 0
  }
}
import { CardColor, getCardColor } from '../../material/Card'
import CardRules from '../CardRules'
import { MaterialItem } from '@gamepark/rules-api'

export default class Trapper extends CardRules {
  getGain(opponentCard: MaterialItem): number {
    if (this.isRefresh) return 0
    const type = getCardColor(opponentCard.id)
    return (type === CardColor.Green || type === CardColor.Yellow) ? 1 : 0
  }

  getSteal(opponentCard: MaterialItem): number {
    if (this.isRefresh) return 0
    const type = getCardColor(opponentCard.id)
    return (type === CardColor.Green || type === CardColor.Yellow) ? 4 : (type === CardColor.Red ? 1 : 0)
  }
}
import CardColor, { getCardColor } from '../../CardColor'
import CardRules from '../CardRules'
import { MaterialItem } from '@gamepark/rules-api'

export default class Dungeon extends CardRules {
  getGain(opponentCard: MaterialItem): number {
    if (this.isRefresh) return 0
    const type = getCardColor(opponentCard.id)
    return type === CardColor.Red ? 0 : 1
  }

  getSteal(opponentCard: MaterialItem): number {
    if (this.isRefresh) return 0
    const type = getCardColor(opponentCard.id)
    return (type === CardColor.Red || type === CardColor.Blue) ? 1 : 0
  }

  getBank(opponentCard: MaterialItem): number {
    if (this.isRefresh) return 0
    const type = getCardColor(opponentCard.id)
    return (type === CardColor.Red || type === CardColor.Blue) ? 1 : 2
  }
}
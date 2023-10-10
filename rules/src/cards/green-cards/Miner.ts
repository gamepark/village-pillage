import CardColor, { getCardColor } from '../../CardColor'
import CardRules from '../CardRules'
import { MaterialItem } from '@gamepark/rules-api'

export default class Miner extends CardRules {
  getGain(opponentCard: MaterialItem): number {
    if (this.isRefresh) return 0
    const type = getCardColor(opponentCard.id)
    return type === CardColor.Blue ? 5 : 4
  }

  isExhaustCard(opponentCard: MaterialItem): boolean {
    if (this.isRefresh) return false
    const type = getCardColor(opponentCard.id)
    return type === CardColor.Blue
  }
}
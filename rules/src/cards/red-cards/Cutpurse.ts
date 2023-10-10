import CardColor, { getCardColor } from '../../CardColor'
import CardRules from '../CardRules'
import { MaterialItem } from '@gamepark/rules-api'

export default class Cutpurse extends CardRules {
  getSteal(opponentCard: MaterialItem): number {
    if (this.isRefresh) return 0
    const type = getCardColor(opponentCard.id)
    return (type === CardColor.Green || type === CardColor.Yellow) ? 6 : 0
  }

  getOpponentGain(opponentCard: MaterialItem): number {
    if (this.isRefresh) return 0
    const type = getCardColor(opponentCard.id)
    return type === CardColor.Red ? 1 : 0
  }
}
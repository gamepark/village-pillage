import { MaterialItem, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { getCardColor } from '../material/Card'
import { RuleId } from './RuleId'
import { getCardRules } from '../cards/getCardRules'
import { Resolution } from './helper/Resolution'
import { Memory } from './Memory'
import CardType from '../CardType'

export class GainRule extends MaterialRulesPart {
  onRuleStart(): MaterialMove<number, number, number>[] {
    const cardType = this.cardType
    const planedCards = this
      .material(MaterialType.Card)
      .location(LocationType.PlanedCard)
      .filter((item) => getCardColor(item.id) === cardType)
      .getItems()

    const moves: MaterialMove[] = planedCards.flatMap((item) => this.getMoveTurnips(item))
    moves.push(this.rules().startRule(RuleId.Steal))
    return moves
  }

  getMoveTurnips(item: MaterialItem): MaterialMove[] {
    const moves: MaterialMove[] = []
    const stock = this.material(MaterialType.Card).location(LocationType.TurnipStock)
    const cardRules = getCardRules(this.game, item.id)
    const resolution = this.getResolution(item)
    const myGain = cardRules.getGain(resolution.opponentCard)
    if (myGain) {
      moves.push(...stock.moveItems({ location: { type: LocationType.PlayerTurnipStock, player: resolution.player } }, myGain))
    }

    const opponentGain = cardRules.getOpponentGain(resolution.opponentCard)
    if (opponentGain) {
      moves.push(...stock.moveItems({ location: { type: LocationType.PlayerTurnipStock, player: resolution.opponent } }, opponentGain))
    }

    return moves
  }

  getResolution(item: MaterialItem) {
    return new Resolution(this.game, item.location.id)
  }

  get cardType() {
    return this.remind<CardType>(Memory.CardType)
  }
}
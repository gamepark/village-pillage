import { MaterialItem, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { getCardColor } from '../material/Card'
import { getCardRules } from '../cards/getCardRules'
import { Resolution } from './helper/Resolution'
import { Memory } from './Memory'
import CardColor from '../CardColor'
import { RuleId } from './RuleId'
import Side from './Side'

export class GainRule extends MaterialRulesPart {
  onRuleStart(): MaterialMove<number, number, number>[] {
    const cardColor = this.cardColor
    const planedCards = this
      .material(MaterialType.Card)
      .location(LocationType.PlanedCard)
      .filter((item) => !this.isTwoPlayerGame || item.location.id === Side.Left)
      .filter((item) => getCardColor(item.id) === cardColor)
      .getItems()

    const moves: MaterialMove[] = planedCards.flatMap((item) => this.getMoveTurnips(item))
    moves.push(this.rules().startRule(RuleId.Steal))
    return moves
  }

  getMoveTurnips(item: MaterialItem): MaterialMove[] {
    const moves: MaterialMove[] = []
    const stock = this.material(MaterialType.Turnip)
    const cardRules = getCardRules(this.game, item.id)
    const resolution = this.getResolution(item)
    const opponentItem = resolution.opponentCard.getItem()!
    const myGain = cardRules.getGain(opponentItem)
    if (myGain) {
      moves.push(stock.createItem({ quantity: myGain, location: { type: LocationType.PlayerTurnipStock, player: resolution.player } }))
    }

    const opponentGain = cardRules.getOpponentGain(opponentItem)
    if (opponentGain) {
      moves.push(stock.createItem({ quantity: myGain, location: { type: LocationType.PlayerTurnipStock, player: resolution.opponent } }))
    }

    return moves
  }

  getResolution(item: MaterialItem) {
    return new Resolution(this.game, item.location.id, item.location.player!)
  }

  get cardColor() {
    return this.remind<CardColor>(Memory.CardColor)
  }

  get isTwoPlayerGame() {
    return this.game.players.length === 2
  }
}
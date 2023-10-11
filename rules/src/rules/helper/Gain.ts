import { MaterialGame, MaterialItem, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { MaterialType } from '../../material/MaterialType'
import { getCardRules } from '../../cards/getCardRules'
import { Resolution } from './Resolution'
import { LocationType } from '../../material/LocationType'

export class Gain extends MaterialRulesPart {

  constructor(game: MaterialGame, readonly item: MaterialItem) {
    super(game)
  }


  get turnipsMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []
    const stock = this.material(MaterialType.Turnip)
    const cardRules = getCardRules(this.game, this.item.id)
    const resolution = new Resolution(this.game, this.item.location.id, this.item.location.player!)
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
}
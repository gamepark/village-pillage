import CardRules from '../CardRules'
import { PlayerId } from '../../VillagePillageOptions'
import { MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '../../material/MaterialType'
import { LocationType } from '../../material/LocationType'

export default class Merchant extends CardRules {
    canBuyRelic = true
    priceToBuyCard = 1

  getAlternativeMoves(player: PlayerId) : MaterialMove[] {
        if (this.priceToBuyCard > this.getTurnips(player)) return []
        return this.material(MaterialType.Card)
          .location(LocationType.Market)
          .moveItems({ location: { type: LocationType.Hand, player }})
    }



  getTurnips(player: PlayerId) {
    const stock = this
      .material(MaterialType.Turnip)
      .location(LocationType.PlayerTurnipStock)
      .player(player)
    const stockSize = !stock.length ? 0 : (stock.getItem()!.quantity ?? 0)
    const bankSize = this
      .material(MaterialType.Turnip)
      .location(LocationType.PlayerBankTurnips)
      .player(player)
      .length

    return stockSize + bankSize
  }
}
import CardRules from '../CardRules'
import { PlayerId } from '../../VillagePillageOptions'
import { MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '../../material/MaterialType'
import { LocationType } from '../../material/LocationType'

export default class Smuggler extends CardRules {
  canBuyRelic = true
  offsetRelicPrice = -2

  getAlternativeMoves(player: PlayerId): MaterialMove[] {
    return this
      .material(MaterialType.Turnip)
      .location(LocationType.PlayerBankTurnips)
      .player(player)
      .moveItems({
        location: {
          type: LocationType.PlayerTurnipStock,
          player,
        },
      })
  }
}
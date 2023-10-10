import CardRules from '../CardRules'
import { PlayerId } from '../../VillagePillageOptions'
import { MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '../../material/MaterialType'
import { LocationType } from '../../material/LocationType'

export default class Bard extends CardRules {
  canBuyRelic = true


  getAlternativeMoves(player: PlayerId): MaterialMove[] {
    const moves: MaterialMove[] = []

    moves.push(
      this.material(MaterialType.Turnip)
        .location(LocationType.TurnipStock)
        .createItem({
          location: {
            type: LocationType.PlayerTurnipStock,
            player,
          },
        }),
    )

    moves.push(
      this.material(MaterialType.Card)
        .location(LocationType.MarketDeck)
        .moveItem({
          location: {
            type: LocationType.Hand,
            player
          }
        })
    )

    return moves
  }
}
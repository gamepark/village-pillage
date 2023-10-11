import CardRules from '../CardRules'
import { PlayerId } from '../../VillagePillageOptions'
import { Material, MaterialMove } from '@gamepark/rules-api'
import { MaterialType } from '../../material/MaterialType'
import { LocationType } from '../../material/LocationType'
import { ExhaustEffect } from '../../rules/helper/ExhaustEffect'

export default class Doctor extends CardRules {
  canBuyRelic = true

  getAlternativeMoves(player: PlayerId, opponentCard: Material): MaterialMove[] {
    const moves: MaterialMove[] = []

    // Gain 2 turnips
    moves.push(
      this
        .material(MaterialType.Turnip)
        .location(LocationType.TurnipStock)
        .createItem({ quantity: 2, location: { type: LocationType.PlayerTurnipStock, player } }),
    )

    new ExhaustEffect(this.game).exhaust(opponentCard.getItems())
    return moves
  }
}
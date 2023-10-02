/** @jsxImportSource @emotion/react */
import { ItemContext, PileLocator } from '@gamepark/react-game'
import { PlayerId } from '@gamepark/village-pillage/VillagePillageOptions'
import { MaterialType } from '@gamepark/village-pillage/material/MaterialType'
import { LocationType } from '@gamepark/village-pillage/material/LocationType'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { getPlayerPosition } from './PlayerLocation'

export class PlayerTurnipStockLocator extends PileLocator<PlayerId, MaterialType, LocationType> {
  rotate = true
  getCoordinates(item: MaterialItem<PlayerId, LocationType>, { rules: { players }, player }: ItemContext<PlayerId, MaterialType, LocationType>): Coordinates {
    return getPlayerPosition(item.location.player!, players, player)
  }
  radius = 3
}

export const playerTurnipStockLocator = new PlayerTurnipStockLocator()

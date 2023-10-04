/** @jsxImportSource @emotion/react */
import { PileLocator } from '@gamepark/react-game'
import { PlayerId } from '@gamepark/village-pillage/VillagePillageOptions'
import { MaterialType } from '@gamepark/village-pillage/material/MaterialType'
import { LocationType } from '@gamepark/village-pillage/material/LocationType'

export class TurnipStockLocator extends PileLocator<PlayerId, MaterialType, LocationType> {
  rotate = true
  coordinates = { x: -14, y: 0, z: 0 }
  radius = 2
}

export const turnipStockLocator = new TurnipStockLocator()
export const turnipStockLocation = { type: LocationType.TurnipStock }

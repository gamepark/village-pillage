/** @jsxImportSource @emotion/react */
import { PileLocator } from '@gamepark/react-game'
import { PlayerId } from '@gamepark/village-pillage/VillagePillageOptions'
import { MaterialType } from '@gamepark/village-pillage/material/MaterialType'
import { LocationType } from '@gamepark/village-pillage/material/LocationType'
import { TurnipStockDescription } from './TurnipStockDescription'

export class TurnipStockLocator extends PileLocator<PlayerId, MaterialType, LocationType> {
  locationDescription = new TurnipStockDescription()
  rotate = true
  coordinates = { ...this.locationDescription.coordinates, z: 0 }
  radius = 3
}

export const turnipStockLocator = new TurnipStockLocator()

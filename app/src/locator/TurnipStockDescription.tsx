/** @jsxImportSource @emotion/react */
import { LocationDescription } from '@gamepark/react-game'
import { LocationType } from '@gamepark/village-pillage/material/LocationType'
import { turnipDescription } from '../material/TurnipDescription'
import { PlayerId } from '@gamepark/village-pillage/VillagePillageOptions'
import { MaterialType } from '@gamepark/village-pillage/material/MaterialType'

export class TurnipStockDescription extends LocationDescription<PlayerId, MaterialType, LocationType> {
  location = turnipStockLocation
  width = turnipDescription.width + 6
  ratio = 1
  borderRadius = this.width / 2
  coordinates = { x: -20, y: 0, z: 0 }
}

export const turnipStockLocation = { type: LocationType.TurnipStock }

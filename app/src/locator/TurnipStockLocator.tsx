/** @jsxImportSource @emotion/react */
import { ItemContext, PileLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { PlayerId } from '@gamepark/village-pillage/VillagePillageOptions'
import { MaterialType } from '@gamepark/village-pillage/material/MaterialType'
import { LocationType } from '@gamepark/village-pillage/material/LocationType'

export class TurnipStockLocator extends PileLocator<PlayerId, MaterialType, LocationType> {
  getCoordinates(_item: MaterialItem, { rules: { players } }: ItemContext) {
    if (players.length === 2) return { x: 41, y: -13,  z: 0 }
    return { x: -15, y: 0, z: 0 }
  }

  radius = 2
}

export const turnipStockLocator = new TurnipStockLocator()
export const turnipStockLocation = { type: LocationType.TurnipStock }

/** @jsxImportSource @emotion/react */
import { ItemContext, LineLocator } from '@gamepark/react-game'
import { PlayerId } from '@gamepark/village-pillage/VillagePillageOptions'
import { MaterialType } from '@gamepark/village-pillage/material/MaterialType'
import { LocationType } from '@gamepark/village-pillage/material/LocationType'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { relicDescription } from '../material/RelicDescription'

export class RelicStockLocator extends LineLocator<PlayerId, MaterialType, LocationType> {
  delta = { x: -1, y: 0, z: 0.05}

  getCoordinates(item: MaterialItem, { rules: { players } }: ItemContext): Coordinates {
    if (players.length === 2) return { x: 42, y: 0 + (item.id - 1) * (relicDescription.diameter + 0.5), z: 0 }
    return { x: -21, y: -3.3 + (item.id - 1) * (relicDescription.diameter + 0.5), z: 0 }
  }
}

export const relicStockLocator = new RelicStockLocator()

export const relicStockLocation = { type: LocationType.RelicStock }

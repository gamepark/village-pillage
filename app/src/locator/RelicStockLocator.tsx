/** @jsxImportSource @emotion/react */
import { LineLocator } from '@gamepark/react-game'
import { PlayerId } from '@gamepark/village-pillage/VillagePillageOptions'
import { MaterialType } from '@gamepark/village-pillage/material/MaterialType'
import { LocationType } from '@gamepark/village-pillage/material/LocationType'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { relicDescription } from '../material/RelicDescription'

export class RelicStockLocator extends LineLocator<PlayerId, MaterialType, LocationType> {
  getDelta(_item: MaterialItem<PlayerId, LocationType>): Partial<Coordinates> {
    return {
      x: -1,
      y: 0,
      z: 0.05
    }
  }

  getCoordinates(_item: MaterialItem<PlayerId, LocationType>): Coordinates {
    return {
      x: -20  ,
      y: -3.3 + (_item.id - 1) * (relicDescription.diameter + 0.5),
      z: 0
    }
  }
}

export const relicStockLocator = new RelicStockLocator()

export const relicStockLocation = { type: LocationType.RelicStock }

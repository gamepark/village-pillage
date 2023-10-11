/** @jsxImportSource @emotion/react */
import { LineLocator } from '@gamepark/react-game'
import { PlayerId } from '@gamepark/village-pillage/VillagePillageOptions'
import { MaterialType } from '@gamepark/village-pillage/material/MaterialType'
import { LocationType } from '@gamepark/village-pillage/material/LocationType'
import { Location, MaterialItem } from '@gamepark/rules-api'

export class PlayerRelicLocator extends LineLocator<PlayerId, MaterialType, LocationType> {
  parentItemType = MaterialType.Bank

  getCoordinates(item: MaterialItem) {
    return {
      x: 1.85,
      y: 3.3 + ((item.id - 1) * 3.75),
      z: 0
    }
  }

  getParentItemId(location: Location) {
    return location.player
  }
}

export const playerRelicLocator = new PlayerRelicLocator()

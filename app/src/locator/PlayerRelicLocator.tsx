/** @jsxImportSource @emotion/react */
import { ItemContext, ItemLocator } from '@gamepark/react-game'
import { PlayerId } from '@gamepark/village-pillage/VillagePillageOptions'
import { MaterialType } from '@gamepark/village-pillage/material/MaterialType'
import { LocationType } from '@gamepark/village-pillage/material/LocationType'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'

export class PlayerRelicLocator extends ItemLocator<PlayerId, MaterialType, LocationType> {
  parentItemType = MaterialType.Bank


  getPosition(item: MaterialItem<PlayerId, LocationType>, _context: ItemContext<PlayerId, MaterialType, LocationType>): Coordinates {
    const x = 2
    const y= (item.location.x!) * 1.6
    return {
      x, y, z: 0
    }
  }

  getParentItemId(location: Location) {
    return location.player
  }
}

export const playerRelicLocator = new PlayerRelicLocator()

/** @jsxImportSource @emotion/react */
import { ItemContext, LineLocator } from '@gamepark/react-game'
import { PlayerId } from '@gamepark/village-pillage/VillagePillageOptions'
import { MaterialType } from '@gamepark/village-pillage/material/MaterialType'
import { LocationType } from '@gamepark/village-pillage/material/LocationType'
import { Location, MaterialItem } from '@gamepark/rules-api'

export class PlayerBankTurnipsLocator extends LineLocator<PlayerId, MaterialType, LocationType> {
  parentItemType = MaterialType.Bank

  getDelta(_item: MaterialItem<PlayerId, LocationType>, { rules: { players } }: ItemContext) {
    return {
      y: players.length === 2? 1.9: 1.6
    }
  }

  getCoordinates(_item: MaterialItem<PlayerId, LocationType>, { displayIndex, rules: { players} }: ItemContext) {
    if (players.length === 2) {
      return {
        x: 8.1 + (displayIndex! % 2 === 0? -2.5: 0),
        y: 4.9,
        z: 0
      }
    }
    return {
      x: 8.1 + (displayIndex! % 2 === 0? 0: -2.5),
      y: 4.5,
      z: 0
    }
  }

  coordinates = { x: 8.1, y: 4.5, z: 0 }

  getParentItemId(location: Location) {
    return location.player
  }
}

export const playerBankTurnipsLocator = new PlayerBankTurnipsLocator()

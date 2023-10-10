/** @jsxImportSource @emotion/react */
import { ItemContext, LineLocator } from '@gamepark/react-game'
import { PlayerId } from '@gamepark/village-pillage/VillagePillageOptions'
import { MaterialType } from '@gamepark/village-pillage/material/MaterialType'
import { LocationType } from '@gamepark/village-pillage/material/LocationType'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { bankLocator } from './BankLocator'
import { getBoardIndex } from './PlayerLocation'

export class PlayerTurnipStockLocator extends LineLocator<PlayerId, MaterialType, LocationType> {
  getDelta(item: MaterialItem, context: ItemContext): Partial<Coordinates> {
    const { rules: { players }, player } = context
    const index = getBoardIndex(item.location.player!, players, player)
    const delta = { x: 0, y: 0 }

    switch (index) {
      case 0:
        delta.y = 1
        break
      case 1:
        delta.x = -1
        break
      case 2:
        delta.y = -1
        break
      case 3:
        delta.x = 1
        break
    }

    return delta
  }

  getCoordinates(item: MaterialItem<PlayerId, LocationType>, context: ItemContext<PlayerId, MaterialType, LocationType>): Coordinates {
    const { rules: { players }, player } = context
    const index = getBoardIndex(item.location.player!, players, player)
    const bank = bankLocator.getPosition(item, context)

    switch (index) {
      case 0:
        bank.y -= 7
        bank.x += 7
        break
      case 1:
        bank.x += 7
        bank.y += 7
        break
      case 2:
        bank.y += 7
        bank.x -= 7
        break
      case 3:
        bank.x -= 7
        bank.y -= 7
        break
    }


    return bank
  }

  getRotation(item: MaterialItem, context: ItemContext) {
    const { rules: { players }, player } = context
    const index = getBoardIndex(item.location.player!, players, player)
    switch (index) {
      case 0:
        return 0
      case 1:
        return 90
      case 2:
        return 180
      case 3:
        return 270
    }

    return 0
  }

  getDeltaMax(item: MaterialItem, context: ItemContext) {
    const { rules: { players }, player } = context
    const index = getBoardIndex(item.location.player!, players, player)
    switch (index) {
      case 0:
        return { y: 15 }
      case 1:
        return { x: -15 }
      case 2:
        return { y: -15 }
      case 3:
        return { x: 15 }
    }

    return {}
  }
}

export const playerTurnipStockLocator = new PlayerTurnipStockLocator()

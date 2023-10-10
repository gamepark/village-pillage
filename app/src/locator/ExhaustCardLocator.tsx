/** @jsxImportSource @emotion/react */
import { ItemContext, ItemLocator } from '@gamepark/react-game'
import { PlayerId } from '@gamepark/village-pillage/VillagePillageOptions'
import { MaterialType } from '@gamepark/village-pillage/material/MaterialType'
import { LocationType } from '@gamepark/village-pillage/material/LocationType'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { bankLocator } from './BankLocator'
import { getBoardIndex } from './PlayerLocation'

export class ExhaustCardLocator extends ItemLocator<PlayerId, MaterialType, LocationType> {

  getPosition(item: MaterialItem<PlayerId, LocationType>, context: ItemContext<PlayerId, MaterialType, LocationType>): Coordinates {
    const { rules: { players }, player } = context
    const index = getBoardIndex(item.location.player!, players, player)
    const bank = bankLocator.getPosition(item, context)

    switch (index) {
      case 0:
        bank.y -= 11.3
        break
      case 1:
        bank.x += 11.3
        break
      case 2:
        bank.y += 11.3
        break
      case 3:
        bank.x -= 11.3
        break
    }


    return bank
  }

  getRotation(item: MaterialItem, context: ItemContext) {
    const { rules: { players }, player } = context
    const index = getBoardIndex(item.location.player!, players, player)
    switch (index) {
      case 0:
        return 90
      case 1:
        return 180
      case 2:
        return 270
      case 3:
        return 0
    }

    return 0
  }
}

export const exhaustCardLocator = new ExhaustCardLocator()

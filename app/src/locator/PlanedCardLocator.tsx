/** @jsxImportSource @emotion/react */
import { ItemContext, ItemLocator, MaterialContext } from '@gamepark/react-game'
import { PlayerId } from '@gamepark/village-pillage/VillagePillageOptions'
import { MaterialType } from '@gamepark/village-pillage/material/MaterialType'
import { LocationType } from '@gamepark/village-pillage/material/LocationType'
import { MaterialItem } from '@gamepark/rules-api'
import { PlanedCardDescription } from './PlanedCardDescription'
import { getBoardIndex, getPlayerPosition } from './PlayerLocation'
import Side from '@gamepark/village-pillage/rules/Side'

export class PlanedCardLocator extends ItemLocator<PlayerId, MaterialType, LocationType> {
  locationDescription = new PlanedCardDescription()

  getPosition(item: MaterialItem, context: MaterialContext) {
    if (item.location.id === Side.Left) {
      return this.getLeftPosition(item, context)
    }

    return this.getRightPosition(item, context)
  }


  getLeftPosition({ location }: MaterialItem, context: MaterialContext) {
    const { rules: { players }, player } = context
    const index = getBoardIndex(location.player!, players, player)
    const playerHand = getPlayerPosition(location.player!, players, player)
    switch (index) {
      case 0:
        playerHand.y -= 1
        playerHand.x -= 23
        break
      case 1:
        playerHand.y -= 15
        playerHand.x += 1
        break
      case 2:
        playerHand.x += 23
        playerHand.y += 1
        break
      case 3:
        playerHand.y += 15
        playerHand.x -= 1
        break
    }

    playerHand.z = 0.05
    return playerHand
  }

  getRightPosition({ location }: MaterialItem, context: MaterialContext) {
    const { rules: { players }, player } = context
    const index = getBoardIndex(location.player!, players, player)
    const playerHand = getPlayerPosition(location.player!, players, player)
    switch (index) {
      case 0:
        playerHand.y -= 1
        playerHand.x += 37
        break
      case 1:
        playerHand.y += 27
        playerHand.x += 1
        break
      case 2:
        playerHand.x -= 37
        playerHand.y += 1
        break
      case 3:
        playerHand.y -= 27
        playerHand.x -= 1
        break
    }

    playerHand.z = 0.05
    return playerHand
  }

  getRotation(item: MaterialItem, { rules: { players }, player }: ItemContext) {
    const index = getBoardIndex(item.location.player!, players, player)
    if (index === 1) return 90
    if (index === 2) return 180
    if (index === 3) return 270
    return 0
  }

  isHidden(item: MaterialItem): boolean {
    return !item.rotation?.y
  }
}

export const planedCardLocator = new PlanedCardLocator()

/** @jsxImportSource @emotion/react */
import { ItemContext, ItemLocator, MaterialContext } from '@gamepark/react-game'
import { PlayerId } from '@gamepark/village-pillage/VillagePillageOptions'
import { MaterialType } from '@gamepark/village-pillage/material/MaterialType'
import { LocationType } from '@gamepark/village-pillage/material/LocationType'
import { MaterialItem } from '@gamepark/rules-api'
import { PlanedCardDescription } from './PlanedCardDescription'
import { getPlayerRotation } from './PlayerLocation'

export class PlanedCardLocator extends ItemLocator<PlayerId, MaterialType, LocationType> {
  locationDescription = new PlanedCardDescription()

  getPosition(item: MaterialItem, context: MaterialContext) {
    const coordinates = this.locationDescription.getCoordinates(item.location, context)
    return {
      ...coordinates,
      z: coordinates.z + 0.05
    }
  }

  getRotation(item: MaterialItem, { rules: { players }, player }: ItemContext) {
    return getPlayerRotation(item.location.player!, players, player)
  }

  isHidden(item: MaterialItem): boolean {
    return !item.rotation?.y
  }
}

export const planedCardLocator = new PlanedCardLocator()

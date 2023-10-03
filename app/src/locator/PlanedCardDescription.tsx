/** @jsxImportSource @emotion/react */
import { LocationDescription, MaterialContext } from '@gamepark/react-game'
import { LocationType } from '@gamepark/village-pillage/material/LocationType'
import { PlayerId } from '@gamepark/village-pillage/VillagePillageOptions'
import { MaterialType } from '@gamepark/village-pillage/material/MaterialType'
import { Location } from '@gamepark/rules-api'
import { getPlayerPosition } from './PlayerLocation'
import Side, { sides } from '@gamepark/village-pillage/rules/Side'
import { gameCardDescription } from '../material/GameCardDescription'

export class PlanedCardDescription extends LocationDescription<PlayerId, MaterialType, LocationType> {
  width = gameCardDescription.width
  height = gameCardDescription.width / gameCardDescription.ratio
  alwaysVisible = true


  getLocations({ player }: MaterialContext) {
    if (!player) return []
    return sides.map((side) => ({ id: side, type: LocationType.PlanedCard, player }))
  }

  getCoordinates(location: Location, context: MaterialContext) {
    if (location.id === Side.LEFT) {
      return this.getLeftPosition(location, context)
    }

    return this.getRightPosition(location, context)
  }


  getLeftPosition(location: Location, context: MaterialContext) {
    const { rules: { players }, player } = context
    const playerHand = getPlayerPosition(location.player!, players, player)
    return {
      x: playerHand.x - 21,
      y: playerHand.y - 2,
      z: playerHand.z
    }
  }

  getRightPosition(location: Location, context: MaterialContext) {
    const { rules: { players }, player } = context
    const playerHand = getPlayerPosition(location.player!, players, player)
    return {
      x: playerHand.x + 35,
      y: playerHand.y - 2,
      z: playerHand.z
    }
  }
}

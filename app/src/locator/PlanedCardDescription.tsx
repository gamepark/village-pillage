/** @jsxImportSource @emotion/react */
import { LocationDescription, MaterialContext } from '@gamepark/react-game'
import { LocationType } from '@gamepark/village-pillage/material/LocationType'
import { PlayerId } from '@gamepark/village-pillage/VillagePillageOptions'
import { MaterialType } from '@gamepark/village-pillage/material/MaterialType'
import { Location } from '@gamepark/rules-api'
import { getBoardIndex, getPlayerPosition } from './PlayerLocation'
import Side, { sides } from '@gamepark/village-pillage/rules/Side'
import { gameCardDescription } from '../material/GameCardDescription'

export class PlanedCardDescription extends LocationDescription<PlayerId, MaterialType, LocationType> {
  width = gameCardDescription.width
  height = gameCardDescription.width / gameCardDescription.ratio
  borderRadius = gameCardDescription.borderRadius


  getLocations({ player }: MaterialContext) {
    if (!player) return []
    return sides.map((side) => ({ id: side, type: LocationType.PlanedCard, player }))
  }

  getCoordinates(location: Location, context: MaterialContext) {
    const { rules: { players }} = context
    if (players.length === 2) return this.getTwoPlayerCoordinates(location, context)
    return this.getFourPlayerCoordinates(location, context)
  }

  getFourPlayerCoordinates(location: Location, context: MaterialContext) {
    if (location.id === Side.Left) {
      return this.getLeftPosition(location, context)
    }

    return this.getRightPosition(location, context)
  }

  getTwoPlayerCoordinates(location: Location, context: MaterialContext) {
    const { rules: { players }, player } = context
    const index = getBoardIndex(location.player!, players, player)
    if (location.id === Side.Left) {
      if (index === 0) return { x: -((gameCardDescription.width / 2) + 0.25), y: 0, z: 0 }
      return { x: (gameCardDescription.width / 2) + 0.25, y: 0, z: 0 }
    }

    if (index === 0) return { x: -((gameCardDescription.width / 2) + 0.25), y: gameCardDescription.getSize(undefined, context).height + 0.5, z: 0 }
    return { x: (gameCardDescription.width / 2) + 0.25, y: -(gameCardDescription.getSize(undefined, context).height + 0.5), z: 0 }
  }


  getLeftPosition(location: Location, context: MaterialContext) {
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

  getRightPosition(location: Location, context: MaterialContext) {
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
}

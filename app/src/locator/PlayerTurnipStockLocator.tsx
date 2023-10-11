/** @jsxImportSource @emotion/react */
import { ItemContext, LineLocator } from '@gamepark/react-game'
import { PlayerId } from '@gamepark/village-pillage/VillagePillageOptions'
import { MaterialType } from '@gamepark/village-pillage/material/MaterialType'
import { LocationType } from '@gamepark/village-pillage/material/LocationType'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { bankLocator } from './BankLocator'
import { getBoardIndex, getPlayerRotation } from './PlayerLocation'

export class PlayerTurnipStockLocator extends LineLocator<PlayerId, MaterialType, LocationType> {
  getDelta(item: MaterialItem, context: ItemContext): Partial<Coordinates> {
    const { rules: { players }, player } = context
    const index = getBoardIndex(item.location.player!, players, player)

    if (players.length === 2) {
      return this.getTwoPlayersDelta(index)
    }

    return this.getFourPlayerDelta(index)
  }

  getTwoPlayersDelta(index: number) {
    switch (index) {
      case 0:
        return { y: 1 }
      case 1:
        return { y: -1 }
    }

    return {}
  }

  getFourPlayerDelta(index: number) {
    switch (index) {
      case 0:
        return { y: 1 }
      case 1:
        return { x: -1 }
      case 2:
        return { y: -1 }
      case 3:
        return { x: 1 }
    }

    return {}
  }

  getCoordinates(item: MaterialItem<PlayerId, LocationType>, context: ItemContext<PlayerId, MaterialType, LocationType>): Coordinates {
    const { rules: { players }, player } = context
    const index = getBoardIndex(item.location.player!, players, player)
    const bank = bankLocator.getPosition(item, context)
    if (players.length === 2) return getTwoPlayerTurnipsStockPosition(index, bank)
    return getFourPlayerTurnipsStockPosition(index, bank)
  }

  getRotation(item: MaterialItem, { rules: { players }, player }: ItemContext) {
    return getPlayerRotation(item.location.player!, players, player)
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

const getTwoPlayerTurnipsStockPosition = (index: number, bank: Coordinates) => {
  switch (index) {
    case 0:
      bank.y -= 7
      bank.x += 7
      break
    case 1:
      bank.y += 7
      bank.x -= 7
      break
  }

  return bank
}

const getFourPlayerTurnipsStockPosition = (index: number, bank: Coordinates) => {
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

export const playerTurnipStockLocator = new PlayerTurnipStockLocator()

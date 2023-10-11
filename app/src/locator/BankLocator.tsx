import { ItemContext, ItemLocator } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { getBoardIndex, getPlayerPosition, getPlayerRotation } from './PlayerLocation'

export class BankLocator extends ItemLocator {
  getPosition(item: MaterialItem, { rules: { players }, player }: ItemContext) {
    const index = getBoardIndex(item.location.player!, players, player)
    const playerHand = getPlayerPosition(item.location.player!, players, player)
    if (players.length === 2) return getTwoPlayerBankPosition(index, playerHand)
    return getFourPlayerBankPosition(index, playerHand)
  }

  getRotation(item: MaterialItem, { rules: { players }, player }: ItemContext) {
    return getPlayerRotation(item.location.player!, players, player)
  }
}

const getFourPlayerBankPosition = (index: number, playerHand: Coordinates) => {
  switch (index) {
    case 0:
      playerHand.x += 24
      playerHand.y -= 2
      break
    case 1:
      playerHand.y += 14
      playerHand.x += 2.5
      break
    case 2:
      playerHand.x -= 14
      playerHand.y += 2.5
      break
    case 3:
      playerHand.y -= 14
      playerHand.x -= 2.5
      break
  }

  return playerHand
}

const getTwoPlayerBankPosition = (index: number, playerHand: Coordinates) => {
  switch (index) {
    case 0:
      playerHand.x += 26
      playerHand.y -= 2
      break
    case 1:
      playerHand.x -= 25
      playerHand.y += 2
      break
  }
  return playerHand
}

export const bankLocator = new BankLocator()
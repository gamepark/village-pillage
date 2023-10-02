import { ItemContext, ItemLocator } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import { getBoardIndex, getPlayerPosition } from './PlayerLocation'

export class BankLocator extends ItemLocator {
  getPosition(item: MaterialItem, { rules: { players }, player }: ItemContext) {
    const index = getBoardIndex(item.location.player!, players, player)
    const playerHand = getPlayerPosition(item.location.player!, players, player)
    switch (index) {
      case 0:
        playerHand.x += 25
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

  getRotation(item: MaterialItem, { rules: { players }, player }: ItemContext) {
    const index = getBoardIndex(item.location.player!, players, player)
    if (index === 1) return 90
    if (index === 2) return 180
    if (index === 3) return -90
    return 0
  }
}

export const bankLocator = new BankLocator()
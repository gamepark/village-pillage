import { HandLocator, ItemContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { getPlayerPosition, getPlayerRotation } from './PlayerLocation'

export class PlayerHandLocator extends HandLocator {
  getCoordinates(location: Location<number, number>, { rules: { players }, player }: ItemContext<number, number, number>): Coordinates {
    return getPlayerPosition(location.player!, players, player)
  }

  getBaseAngle(item: MaterialItem, { rules: { players }, player }: ItemContext) {
    return getPlayerRotation(item.location.player!, players, player)
  }

  isHidden(item: MaterialItem, context: ItemContext) {
    const player = context.player
    if (!player || item.location.player !== player) return true;
    return false
  }

  getMaxAngle(item: MaterialItem, { rules: { players }, player }: ItemContext) {
    if (players.length === 2) return 17
      return item.location.player === (player ?? players) ? 15 : 5
  }
}

export const playerHandLocator = new PlayerHandLocator()
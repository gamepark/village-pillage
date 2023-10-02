import { HandLocator, ItemContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { getPlayerPosition } from './PlayerLocation'

export class PlayerHandLocator extends HandLocator {
  getCoordinates(location: Location<number, number>, { rules: { players }, player }: ItemContext<number, number, number>): Coordinates {
    return getPlayerPosition(location.player!, players, player)
  }

  getBaseAngle(item: MaterialItem, _context: ItemContext) {
    switch (item.location.player) {
      case 1:
        return 0
      case 2:
        return 90
      case 3:
        return 180
      case 4:
        return -90
    }

    return 0
  }

  isHidden(item: MaterialItem, context: ItemContext) {
    const player = context.player
    if (!player || item.location.player !== player) return true;
    return false
  }

  getMaxAngle(item: MaterialItem, { rules, player }: ItemContext) {
    return item.location.player === (player ?? rules.players[0]) ? 15 : 5
  }
}

export const playerHandLocator = new PlayerHandLocator()
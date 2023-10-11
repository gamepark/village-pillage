import { DeckLocator, ItemContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'

export class MarketDeckLocator extends DeckLocator {
  delta = { x: -0.05, y: -0.05, z: 0.05 }

  getCoordinates(_item: MaterialItem, { rules: { players } }: ItemContext) {
    if (players.length === 2) return { x: -40, y: -20, z: 0 }
    return { x: -7, y: 0, z: 0 }
  }

  hidden = true
}

export const marketDeckLocator = new MarketDeckLocator()
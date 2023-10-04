import { DeckLocator } from '@gamepark/react-game'

export class MarketDeckLocator extends DeckLocator {
  delta = { x: -0.05, y: -0.05, z: 0.05 }
  coordinates = { x: -6, y: 0, z: 0}
  hidden = true
}

export const marketDeckLocator = new MarketDeckLocator()
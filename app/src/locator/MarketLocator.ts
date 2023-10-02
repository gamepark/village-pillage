import { LineLocator } from '@gamepark/react-game'
import { gameCardDescription } from '../material/GameCardDescription'

export class MarketLocator extends LineLocator {
  delta = { x: gameCardDescription.width + 0.5, y: 0, z: 0 }
  coordinates = { x: -3, y: 0, z: 0}
}

export const marketLocator = new MarketLocator()
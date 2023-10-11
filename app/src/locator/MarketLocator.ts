import { ItemContext, LineLocator } from '@gamepark/react-game'
import { gameCardDescription } from '../material/GameCardDescription'
import { MaterialItem } from '@gamepark/rules-api'
import { marketDeckLocator } from './MarketDeckLocator'

export class MarketLocator extends LineLocator {

  getDelta(item: MaterialItem, context: ItemContext) {
    const { rules: { players } } = context
    if (players.length === 2) return { y: gameCardDescription.getSize(item.id, context).height + 0.5 }
    return { x: gameCardDescription.width + 0.5}
  }

  getCoordinates(item: MaterialItem, context: ItemContext) {
    const { rules: { players } } = context
    const deck = marketDeckLocator.getCoordinates(item, context)
    if (players.length === 2) return { ...deck, y: deck.y + gameCardDescription.getSize(undefined, context).height + 0.5 }
    return { ...deck, x: deck.x + gameCardDescription.getSize(undefined, context).width + 0.5 }
  }
}

export const marketLocator = new MarketLocator()
import { ItemContext, LineLocator } from '@gamepark/react-game'
import { cardDescriptionEnglish } from '../material/CardDescriptionEnglish'
import { MaterialItem } from '@gamepark/rules-api'
import { marketDeckLocator } from './MarketDeckLocator'

export class MarketLocator extends LineLocator {

  getDelta(item: MaterialItem, context: ItemContext) {
    const { rules: { players } } = context
    if (players.length === 2) return { y: cardDescriptionEnglish.getSize(item.id, context).height + 0.5 }
    return { x: cardDescriptionEnglish.width + 0.5}
  }

  getCoordinates(item: MaterialItem, context: ItemContext) {
    const { rules: { players } } = context
    const deck = marketDeckLocator.getCoordinates(item, context)
    if (players.length === 2) return { ...deck, y: deck.y + cardDescriptionEnglish.getSize(undefined, context).height + 0.5 }
    return { ...deck, x: deck.x + cardDescriptionEnglish.getSize(undefined, context).width + 0.5 }
  }
}

export const marketLocator = new MarketLocator()
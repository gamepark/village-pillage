import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { hideItemId, hideItemIdToOthers } from '@gamepark/rules-api'

export const hidingStrategies = {
  [MaterialType.Card]: {
    [LocationType.MarketDeck]: hideItemId,
    [LocationType.Hand]: hideItemIdToOthers
  }
}
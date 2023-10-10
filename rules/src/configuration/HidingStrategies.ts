import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { hideItemId, hideItemIdToOthers, MaterialItem } from '@gamepark/rules-api'
import { PlayerId } from '../VillagePillageOptions'

export const hidingStrategies = {
  [MaterialType.Card]: {
    [LocationType.MarketDeck]: hideItemId,
    [LocationType.Hand]: hideItemIdToOthers,
    [LocationType.PlanedCard]: (item: MaterialItem, player?: PlayerId) => (!item.rotation?.y && player !== item.location.player) ? ['id']: []
  }
}
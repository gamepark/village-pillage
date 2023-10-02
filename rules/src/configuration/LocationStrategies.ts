import { LocationType } from '../material/LocationType'
import { LocationStrategy, PositiveSequenceStrategy } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { PlayerId } from '../VillagePillageOptions'

export const locationsStrategies:  Partial<Record<MaterialType, Partial<Record<LocationType, LocationStrategy<PlayerId, MaterialType, LocationType>>>>> = {
  [MaterialType.Card]: {
    [LocationType.Hand]: new PositiveSequenceStrategy(),
    [LocationType.MarketDeck]: new PositiveSequenceStrategy(),
    [LocationType.Market]: new PositiveSequenceStrategy()
  },
  [MaterialType.Turnip]: {
    [LocationType.PlayerBankTurnips]: new PositiveSequenceStrategy()
  }
}

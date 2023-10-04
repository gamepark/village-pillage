import { ItemLocator } from '@gamepark/react-game'
import { PlayerId } from '@gamepark/village-pillage/VillagePillageOptions'
import { MaterialType } from '@gamepark/village-pillage/material/MaterialType'
import { LocationType } from '@gamepark/village-pillage/material/LocationType'
import { playerHandLocator } from './PlayerHandLocator'
import { turnipStockLocator } from './TurnipStockLocator'
import { bankLocator } from './BankLocator'
import { playerTurnipStockLocator } from './PlayerTurnipStockLocator'
import { playerBankTurnipsLocator } from './PlayerBankTurnipsLocator'
import { marketDeckLocator } from './MarketDeckLocator'
import { marketLocator } from './MarketLocator'
import { planedCardLocator } from './PlanedCardLocator'
import { playerRelicLocator } from './PlayerRelicLocator'
import { relicStockLocator } from './RelicStockLocator'

export const Locators: Record<LocationType, ItemLocator<PlayerId, MaterialType, LocationType>> = {
  [LocationType.Hand]: playerHandLocator,
  [LocationType.TurnipStock]: turnipStockLocator,
  [LocationType.RelicStock]: relicStockLocator,
  [LocationType.Bank]: bankLocator,
  [LocationType.PlayerTurnipStock]: playerTurnipStockLocator,
  [LocationType.PlayerBankTurnips]: playerBankTurnipsLocator,
  [LocationType.PlayerRelics]: playerRelicLocator,
  [LocationType.MarketDeck]: marketDeckLocator,
  [LocationType.Market]: marketLocator,
  [LocationType.PlanedCard]: planedCardLocator,
}

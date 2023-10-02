import { MaterialDescription } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/village-pillage/material/MaterialType'
import { gameCardDescription } from './GameCardDescription'
import { turnipDescription } from './TurnipDescription'
import { bankDescription } from './BankDescription'

export const material: Record<MaterialType, MaterialDescription> = {
  [MaterialType.Card]: gameCardDescription,
  [MaterialType.Turnip]: turnipDescription,
  [MaterialType.Bank]: bankDescription
}
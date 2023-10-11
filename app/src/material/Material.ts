import { MaterialDescription } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/village-pillage/material/MaterialType'
import { cardDescriptionEnglish } from './CardDescriptionEnglish'
import { turnipDescription } from './TurnipDescription'
import { bankDescriptionEnglish } from './BankDescriptionEnglish'
import { relicDescription } from './RelicDescription'
import { cardDescriptionFrench } from './CardDescriptionFrench'
import { bankDescriptionFrench } from './BankDescriptionFrench'

export const material: Record<MaterialType, MaterialDescription> = {
  [MaterialType.Card]: cardDescriptionEnglish,
  [MaterialType.Turnip]: turnipDescription,
  [MaterialType.Bank]: bankDescriptionEnglish,
  [MaterialType.Relic]: relicDescription
}

export const materialI18n: Record<string, Partial<Record<MaterialType, MaterialDescription>>> = {
  'fr': {
    [MaterialType.Card]: cardDescriptionFrench,
    [MaterialType.Bank]: bankDescriptionFrench,
  }
}
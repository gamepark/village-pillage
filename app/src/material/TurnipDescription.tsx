import { TokenDescription } from '@gamepark/react-game'
import { turnipStockLocation } from '../locator/TurnipStockLocator'
import { TurnipRules } from './rules/TurnipRules'
import Turnip from '../images/turnip.png'

export class TurnipDescription extends TokenDescription {
  width = 3
  ratio = 160 / 177
  image = Turnip

  staticItem = { quantity: 10, location: turnipStockLocation }
  stockLocation = turnipStockLocation

  rules = TurnipRules
}

export const turnipDescription = new TurnipDescription()
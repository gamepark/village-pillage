import { TokenDescription } from '@gamepark/react-game'
import { turnipStockLocation } from '../locator/TurnipStockDescription'
import Turnip from '../images/turnip.png'

export class TurnipDescription extends TokenDescription {
  width = 3
  ratio = 160 / 177
  image = Turnip
  rules = () => <p></p>
  staticItem = { quantity: 10, location: turnipStockLocation }
  stockLocation = turnipStockLocation
}

export const turnipDescription = new TurnipDescription()
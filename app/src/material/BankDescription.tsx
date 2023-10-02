import { BoardDescription, MaterialContext } from '@gamepark/react-game'
import Images from '../images/Images'
import { LocationType } from '@gamepark/village-pillage/material/LocationType'

export class BankDescription extends BoardDescription {
  width = 10
  ratio = 327 / 500
  image = Images.Bank
  getStaticItems( { rules: { players } }: MaterialContext) {
    return players.map((player) => ({ id: player, location: { type: LocationType.Bank, player }}))
  }

  rules = () => <p></p>

}

export const bankDescription = new BankDescription()
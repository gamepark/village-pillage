import { BoardDescription, MaterialContext } from '@gamepark/react-game'
import Images from '../images/Images'
import { LocationType } from '@gamepark/village-pillage/material/LocationType'
import { BankRules } from './rules/BankRules'

enum BankType {
  Duel = 1,
  Other
}

export class BankDescription extends BoardDescription {
  width = 10
  ratio = 327 / 500

  images = {
    [BankType.Duel]: Images.BankDuel,
    [BankType.Other]: Images.Bank
  }

  protected getFrontId(_itemId: any, { rules: { players } }: MaterialContext): any {
    return players.length === 2? BankType.Duel: BankType.Other
  }

  getStaticItems( { rules: { players } }: MaterialContext) {
    return players.map((player) => ({ id: player, location: { type: LocationType.Bank, player }}))
  }

  rules = BankRules

}

export const bankDescription = new BankDescription()
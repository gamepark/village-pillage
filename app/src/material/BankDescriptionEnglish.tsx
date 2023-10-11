import { BoardDescription, MaterialContext } from '@gamepark/react-game'
import { LocationType } from '@gamepark/village-pillage/material/LocationType'
import { BankRules } from './rules/BankRules'
import Bank from '../images/bank.jpg'
import BankDuel from '../images/en/bank-duel.jpg'

enum BankType {
  Duel = 1,
  Other
}

export class BankDescriptionEnglish extends BoardDescription {
  width = 10
  ratio = 327 / 500

  images = {
    [BankType.Duel]: BankDuel,
    [BankType.Other]: Bank
  }

  protected getFrontId(_itemId: any, { rules: { players } }: MaterialContext): any {
    return players.length === 2? BankType.Duel: BankType.Other
  }

  getStaticItems( { rules: { players } }: MaterialContext) {
    return players.map((player) => ({ id: player, location: { type: LocationType.Bank, player }}))
  }

  rules = BankRules

}

export const bankDescriptionEnglish = new BankDescriptionEnglish()
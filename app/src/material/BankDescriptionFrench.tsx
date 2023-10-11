import Bank from '../images/bank.jpg'
import BankDuel from '../images/fr/bank-duel-fr.jpg'
import { BankDescriptionEnglish } from './BankDescriptionEnglish'

enum BankType {
  Duel = 1,
  Other
}

export class BankDescriptionFrench extends BankDescriptionEnglish {
  images = {
    [BankType.Duel]: BankDuel,
    [BankType.Other]: Bank
  }
}

export const bankDescriptionFrench = new BankDescriptionFrench()
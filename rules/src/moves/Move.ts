import BankTurnips from './BankTurnips'
import ChangeResolveStep from './ChangeResolveStep'
import ChooseCard from './ChooseCard'
import FlipChicken from './FlipChicken'
import GainTurnips from './GainTurnips'
import PlayCard from './PlayCard'
import RevealCards from './RevealCards'
import SpendBankTurnips from './SpendBankTurnips'
import StealTurnips from './StealTurnips'

/**
 * A "Move" is the combination of all the types of moves that exists in you game
 */
type Move = PlayCard | RevealCards | GainTurnips | ChangeResolveStep | BankTurnips | StealTurnips | FlipChicken | SpendBankTurnips | ChooseCard

export default Move
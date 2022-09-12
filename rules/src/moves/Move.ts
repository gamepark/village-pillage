import BankTurnips from './BankTurnips'
import ChangeResolveStep from './ChangeResolveStep'
import ChooseCard from './ChooseCard'
import FlipChicken from './FlipChicken'
import GainTurnips from './GainTurnips'
import PlayCard from './PlayCard'
import RevealCards from './RevealCards'
import SpendBankTurnips from './SpendBankTurnips'
import SpendStockTurnips from './SpendStockTurnips'
import StealTurnips from './StealTurnips'
import TakeRelic from './TakeRelic'

/**
 * A "Move" is the combination of all the types of moves that exists in you game
 */
type Move = PlayCard | RevealCards | GainTurnips | ChangeResolveStep | BankTurnips | StealTurnips | FlipChicken | SpendStockTurnips | SpendBankTurnips | ChooseCard | TakeRelic

export default Move
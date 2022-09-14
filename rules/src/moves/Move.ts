import AddPendingAction from './AddPendingAction'
import BankTurnips from './BankTurnips'
import ChangeResolveStep from './ChangeResolveStep'
import ChooseCard from './ChooseCard'
import FlipChicken from './FlipChicken'
import GainTurnips from './GainTurnips'
import GivePriorityToBuyCard from './GivePriorityToBuyCard'
import PlayCard from './PlayCard'
import RevealCards from './RevealCards'
import SpendBankTurnips from './SpendBankTurnips'
import SpendStockTurnips from './SpendStockTurnips'
import StealTurnips from './StealTurnips'
import TakeMarketCard from './TakeMarketCard'
import TakeRelic from './TakeRelic'

/**
 * A "Move" is the combination of all the types of moves that exists in you game
 */
type Move = PlayCard | RevealCards | GainTurnips | ChangeResolveStep | BankTurnips | StealTurnips | FlipChicken | SpendStockTurnips | SpendBankTurnips |
            ChooseCard | TakeRelic | AddPendingAction | GivePriorityToBuyCard | TakeMarketCard

export default Move
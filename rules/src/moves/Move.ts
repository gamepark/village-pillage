import BankTurnips from './BankTurnips'
import ChangeResolveStep from './ChangeResolveStep'
import GainTurnips from './GainTurnips'
import PlayCard from './PlayCard'
import RevealCards from './RevealCards'
import StealTurnips from './StealTurnips'

/**
 * A "Move" is the combination of all the types of moves that exists in you game
 */
type Move = PlayCard | RevealCards | GainTurnips | ChangeResolveStep | BankTurnips | StealTurnips

export default Move
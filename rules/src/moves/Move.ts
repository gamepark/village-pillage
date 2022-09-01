import ChangeResolveStep from './ChangeResolveStep'
import GainTurnips from './GainTurnips'
import PlayCard from './PlayCard'
import RevealCards from './RevealCards'

/**
 * A "Move" is the combination of all the types of moves that exists in you game
 */
type Move = PlayCard | RevealCards | GainTurnips | ChangeResolveStep

export default Move
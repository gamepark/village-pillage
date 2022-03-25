import PlayCard from './PlayCard'
import RevealCards from './RevealCards'

/**
 * A "Move" is the combination of all the types of moves that exists in you game
 */
type Move = PlayCard | RevealCards

export default Move
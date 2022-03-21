import DrawCard from './DrawCard'
import PlayCard from './PlayCard'

/**
 * A "Move" is the combination of all the types of moves that exists in you game
 */
type Move = PlayCard | DrawCard // | DoOtherStuff | ChooseCard | MovePawn...

export default Move
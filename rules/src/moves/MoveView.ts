import Move from './Move'
import {PlayCardView} from './PlayCard'
import RevealCards, {RevealCardsView} from './RevealCards'

/**
 * A "MoveView" is the combination of all the types of move views that exists in you game.
 * It usually derives from "Move". You can exclude some Move using: = Exclude<Move, MoveToExclude | OtherMoveToExclude> | MoveToInclude...
 */
type MoveView = Exclude<Move, RevealCards> | PlayCardView | RevealCardsView

export default MoveView
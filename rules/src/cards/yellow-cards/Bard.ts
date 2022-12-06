import CardRules from "../CardRules";
import PlayerState from "../../PlayerState";
import PlayerView from "../../PlayerView";
import Move from "../../moves/Move";
import { gainTurnipsMove } from "../../moves/GainTurnips";

export default class Bard extends CardRules{
    canBuyRelic = true


    getAlternativeMoves(player: PlayerState | PlayerView) : Move[] {
        const moves: Move[] = []
        moves.push(gainTurnipsMove(player.id, 1))
        // TODO Draw first card

        return moves
    }
}
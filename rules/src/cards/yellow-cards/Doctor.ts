import PlayerState from "../../PlayerState";
import PlayerView from "../../PlayerView";
import CardRules from "../CardRules";
import Move from "../../moves/Move";
import { gainTurnipsMove } from "../../moves/GainTurnips";

export default class Doctor extends CardRules{
    canBuyRelic = true

    getAlternativeMoves(player: PlayerState | PlayerView) : Move[] {
        const moves: Move[] = []
        moves.push(gainTurnipsMove(player.id, 2))
        // TODO exhaust opponent card

        return moves
    }
}
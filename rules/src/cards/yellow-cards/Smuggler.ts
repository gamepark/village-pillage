import CardRules from "../CardRules";
import PlayerState from "../../PlayerState";
import PlayerView from "../../PlayerView";
import Move from "../../moves/Move";
import { bankTurnipsMove } from "../../moves/BankTurnips";

export default class Bard extends CardRules{
    canBuyRelic = true
    offsetRelicPrice = -2

    getAlternativeMoves(player: PlayerState | PlayerView) : Move[] {
        const moves: Move[] = []
        if (player.bank > 0) moves.push(bankTurnipsMove(player.id, -player.bank))
        
        return moves
    }
}
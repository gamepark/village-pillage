import { addPendingActionMove } from "../../moves/AddPendingAction";
import Move from "../../moves/Move";
import MoveType from "../../moves/MoveType";
import PlayerState, { getFuturePlayerTurnips } from "../../PlayerState";
import PlayerView from "../../PlayerView";
import CardRules from "../CardRules";

export default class Merchant extends CardRules{
    canBuyRelic = true
    priceToBuyCard = 1

    getAlternativeMoves(player: PlayerState | PlayerView) : Move[] {
        const moves: Move[] = []
        if (getFuturePlayerTurnips(player) >= this.priceToBuyCard) {
            moves.push(addPendingActionMove(player.id, {type: MoveType.TakeMarketCard, wait: true}))
          }

        return moves
    }
}
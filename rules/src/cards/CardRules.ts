import CardColor from "../CardColor";
import Move from "../moves/Move";
import Phase from "../Phase";
import PlayerState from "../PlayerState";
import PlayerView from "../PlayerView";

export default abstract class CardRules {
    gain = 0
    gainInRefresh = 0
    opponentGain = 0
    stealValue = 0
    stealValueFromOpponentCard = 0
    bank = 0
    canBuyRelic = false
    priceToBuyCard = Infinity
    offsetRelicPrice = 0
    moves = []

    getGain(_opposingCardColor: CardColor) : number {
        if (Phase.RESOLVE) return this.gain
        else if (Phase.REFRESH) return this.gainInRefresh
        else return 0
    }
    getOpponentGain(_opposingCardColor: CardColor) : number {
        if (Phase.RESOLVE) return this.opponentGain
        else return 0
    }
    getSteal(_opposingCardColor: CardColor) : number {
        if (Phase.RESOLVE) return this.stealValue
        else return 0
    }
    getStealToOpponent(_opposingCardColor: CardColor) : number {
        if (Phase.RESOLVE) return this.stealValueFromOpponentCard
        else return 0
    }
    getBank(_opposingCardColor: CardColor) : number {
        if (Phase.RESOLVE) return this.bank
        else return 0
    }

    getAlternativeMoves(_player: PlayerState | PlayerView) : Move[] {
        if (Phase.RESOLVE) return this.moves
        else return []
    }
}
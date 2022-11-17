import CardColor from "../CardColor";
import Phase from "../Phase";

export default abstract class CardRules {
    gain = 0
    gainInRefresh = 0
    opponentgain = 0

    getGain(_opposingCardColor: CardColor) : number {
        if (Phase.RESOLVE) return this.gain
        else if (Phase.REFRESH) return this.gainInRefresh
        else return 0
    }
    getOpponentGain(_opposingCardColor: CardColor) : number {
        if (Phase.RESOLVE) return this.opponentgain
        else return 0
    }
}
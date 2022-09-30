import CardColor from "../CardColor";
import Phase from "../Phase";

export default abstract class CardRules {
    gain: number = 0
    gainInRefresh: number = 0

    getGain(_opposingCardColor: CardColor) {
        if (Phase.RESOLVE) return this.gain
        else if (Phase.REFRESH) return this.gainInRefresh
        else return 0
    }

}
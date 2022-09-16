import CardColor from "../CardColor";

export default abstract class CardRules {
    gain: number = 0

    getGain(_opposingCardColor: CardColor) {
        return this.gain
    }

}
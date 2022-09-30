import CardColor from "../../CardColor";
import CardRules from "../CardRules";

export default class RatCatcher extends CardRules {
    getGain(opposingCardColor: CardColor): number {
        return opposingCardColor === CardColor.Green ? 6 : 4
    }
}
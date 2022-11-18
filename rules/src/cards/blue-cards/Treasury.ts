import CardColor from "../../CardColor";
import CardRules from "../CardRules";

export default class Treasury extends CardRules{
    bank = 4

    getGain(opposingCardColor: CardColor): number {
        return opposingCardColor === CardColor.Red ? 0 : 1
    }
    getSteal(opposingCardColor: CardColor): number {
        return opposingCardColor === CardColor.Red ? 2 : 0
    }
}
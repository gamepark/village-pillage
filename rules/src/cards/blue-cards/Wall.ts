import CardColor from "../../CardColor";
import CardRules from "../CardRules";

export default class Wall extends CardRules{
    bank = 1

    getGain(opposingCardColor: CardColor): number {
        return opposingCardColor === CardColor.Red ? 0 : 1
    }
    getSteal(opposingCardColor: CardColor): number {
        return opposingCardColor === CardColor.Red ? 1 : 0
    }
}
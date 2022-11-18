import CardColor from "../../CardColor";
import CardRules from "../CardRules";

export default class Farmer extends CardRules{
    gain = 4

    getBank(opposingCardColor: CardColor): number {
        return opposingCardColor === CardColor.Red ? 0 : 2
    }
}
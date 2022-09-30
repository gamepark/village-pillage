import CardColor from "../../CardColor";
import CardRules from "../CardRules";

export default class Wall extends CardRules{
    getGain(opposingCardColor: CardColor): number {
        return opposingCardColor === CardColor.Red ? 0 : 1
    }
}
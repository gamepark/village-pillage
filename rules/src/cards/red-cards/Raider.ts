import CardColor from "../../CardColor";
import CardRules from "../CardRules";

export default class Raider extends CardRules{
    getSteal(opposingCardColor: CardColor): number {
        return (opposingCardColor === CardColor.Green || opposingCardColor === CardColor.Yellow) ? 4 : 0
    }
}
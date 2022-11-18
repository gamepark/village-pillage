import CardColor from "../../CardColor";
import CardRules from "../CardRules";

export default class Veteran extends CardRules{
    getSteal(opposingCardColor: CardColor): number {
        return (opposingCardColor === CardColor.Green || opposingCardColor === CardColor.Yellow) ? 6 : 0
    }
}
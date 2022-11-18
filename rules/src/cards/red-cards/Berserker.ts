import CardColor from "../../CardColor";
import CardRules from "../CardRules";

export default class Berserker extends CardRules{
    getSteal(opposingCardColor: CardColor): number {
        return (opposingCardColor === CardColor.Green || opposingCardColor === CardColor.Yellow) ? 6 : 0
    }
    getStealToOpponent(opposingCardColor: CardColor): number {
        return opposingCardColor === CardColor.Blue ? 1 : 0
    }
}
import CardColor from "../../CardColor";
import CardRules from "../CardRules";

export default class Trapper extends CardRules{
    getGain(opposingCardColor: CardColor): number {
        return (opposingCardColor === CardColor.Green || opposingCardColor === CardColor.Yellow) ? 1 : 0
    }
    getSteal(opposingCardColor: CardColor): number {
        return (opposingCardColor === CardColor.Green || opposingCardColor === CardColor.Yellow) ? 4 : (opposingCardColor === CardColor.Red ? 1 : 0)
    }
}
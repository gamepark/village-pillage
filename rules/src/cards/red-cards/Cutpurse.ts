import CardColor from "../../CardColor";
import CardRules from "../CardRules";

export default class Cutpurse extends CardRules{
    getSteal(opposingCardColor: CardColor): number {
        return (opposingCardColor === CardColor.Green || opposingCardColor === CardColor.Yellow) ? 6 : 0
    }
    getOpponentGain(opposingCardColor: CardColor): number {
        return opposingCardColor === CardColor.Red ? 1 : 0
    }
}
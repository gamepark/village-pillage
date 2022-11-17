import CardColor from "../../CardColor";
import CardRules from "../CardRules";

export default class Moat extends CardRules{
    getGain(opposingCardColor: CardColor): number {
        return opposingCardColor === CardColor.Red ? 2 : 0
    }
    getOpponentGain(opposingCardColor: CardColor): number {
        return opposingCardColor === CardColor.Green ? 1 :0
    }
}
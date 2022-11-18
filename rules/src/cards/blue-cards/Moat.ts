import CardColor from "../../CardColor";
import CardRules from "../CardRules";

export default class Moat extends CardRules{
    getGain(opposingCardColor: CardColor): number {
        return opposingCardColor === CardColor.Red ? 2 : 0
    }
    getOpponentGain(opposingCardColor: CardColor): number {
        return opposingCardColor === CardColor.Green ? 1 :0
    }
    getSteal(opposingCardColor: CardColor): number {
        return opposingCardColor === CardColor.Red ? 3 : 0
    }
    getBank(opposingCardColor: CardColor): number {
        return opposingCardColor === (CardColor.Blue | CardColor.Yellow) ? 2 : 0
    }
}
import CardColor from "../../CardColor";
import CardRules from "../CardRules";

export default class Labyrinth extends CardRules{
    getGain(opposingCardColor: CardColor): number {
        return opposingCardColor === CardColor.Red ? 0 : 1
    }
    getSteal(opposingCardColor: CardColor): number {
        return opposingCardColor === CardColor.Red ? 3 : 0
    }
    getBank(opposingCardColor: CardColor): number {
        return opposingCardColor === CardColor.Red ? 0 : 2
    }
}
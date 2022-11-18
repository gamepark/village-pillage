import CardColor from "../../CardColor";
import CardRules from "../CardRules";

export default class Mason extends CardRules {
    gain = 4

    getSteal(opposingCardColor: CardColor) : number {
        return opposingCardColor === CardColor.Blue ? 1 : 0
    }
    getBank(opposingCardColor: CardColor): number {
        return opposingCardColor === CardColor.Blue ? 2 : 0
    }
}
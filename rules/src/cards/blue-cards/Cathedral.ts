import CardColor from "../../CardColor";
import CardRules from "../CardRules";

export default class Cathedral extends CardRules{
    priceToBuyCard = 1

    getStealToOpponent(opposingCardColor: CardColor): number {
        return opposingCardColor === CardColor.Red ? 3 : 0
    }
    getBank(opposingCardColor: CardColor): number {
        return opposingCardColor === CardColor.Red ? 1 : 0
    }
}
import CardColor from "../../CardColor";
import CardRules from "../CardRules";

export default class Outlaw extends CardRules{
    priceToBuyCard = 0

    getSteal(opposingCardColor: CardColor): number {
        return opposingCardColor === CardColor.Green ? 5 : (opposingCardColor === CardColor.Yellow ? 4 : 0)
    }
}
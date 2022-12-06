import CardColor from "../../CardColor";
import CardRules from "../CardRules";

export default class Innkeeper extends CardRules {
    priceToBuyCard = 0

    getGain(opposingCardColor: CardColor): number {
        return opposingCardColor === CardColor.Yellow ? 5 : 4
    }
}
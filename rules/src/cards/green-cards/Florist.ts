import CardColor from "../../CardColor";
import CardRules from "../CardRules";

export default class Florist extends CardRules {
    gain = 5
    
    getStealToOpponent(opposingCardColor: CardColor) : number {
        return opposingCardColor === CardColor.Red ? 2 : 0
    }
}
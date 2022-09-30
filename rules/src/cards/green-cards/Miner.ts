import CardColor from "../../CardColor";
import CardRules from "../CardRules";

export default class Miner extends CardRules {
    getGain(opposingCardColor: CardColor): number {
        return opposingCardColor === CardColor.Blue ? 5 : 4
    }
}
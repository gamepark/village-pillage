import CardColor from "../../CardColor";
import CardRules from "../CardRules";

export default class TollBridge extends CardRules{
    // TODO : Peut voler dans la banque !
    getSteal(opposingCardColor: CardColor): number {
        return (opposingCardColor === CardColor.Red || opposingCardColor === CardColor.Yellow) ? 2 : 0
    }
    getBank(opposingCardColor: CardColor): number {
        return (opposingCardColor === CardColor.Green || opposingCardColor === CardColor.Blue) ? 2 : 0
    }
}
import CardColor from "../../CardColor";
import CardRules from "../CardRules";

export default class Burglar extends CardRules{
    // TODO : Peut voler dans la banque !
    getSteal(opposingCardColor: CardColor): number {
        return (opposingCardColor === CardColor.Green || opposingCardColor === CardColor.Yellow) ? 4 : 0
    }
}
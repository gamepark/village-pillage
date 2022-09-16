import Card from "../Card";
import CardRules from "./CardRules";
import Farmer from "./green-cards/Farmer";

export default function getCardRules(card: Card) : CardRules {
    switch(card) {
        case Card.Farmer: return new Farmer()
        default: throw new Error("missing card rule")
        
    }

}

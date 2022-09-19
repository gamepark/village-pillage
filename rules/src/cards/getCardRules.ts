import Card from "../Card";
import CardRules from "./CardRules";
import Farmer from "./green-cards/Farmer";
import Innkeeper from "./green-cards/Innkeeper";

export default function getCardRules(card: Card) : CardRules {
    switch(card) {
        case Card.Farmer: return new Farmer()
        case Card.Innkeeper: return new Innkeeper()
        default: throw new Error("missing card rule")
    }
}

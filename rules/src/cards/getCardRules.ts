import Card from "../Card";
import Cathedral from "./blue-cards/Cathedral";
import Dungeon from "./blue-cards/Dungeon";
import Labyrinth from "./blue-cards/Labyrinth";
import Moat from "./blue-cards/Moat";
import Monastery from "./blue-cards/Monastery";
import TollBridge from "./blue-cards/TollBridge";
import Treasury from "./blue-cards/Treasury";
import Wall from "./blue-cards/Wall";
import CardRules from "./CardRules";
import Farmer from "./green-cards/Farmer";
import Florist from "./green-cards/Florist";
import Innkeeper from "./green-cards/Innkeeper";
import Mason from "./green-cards/Mason";
import Miner from "./green-cards/Miner";
import Pickler from "./green-cards/Pickler";
import RatCatcher from "./green-cards/RatCatcher";
import Shepherd from "./green-cards/Shepherd";

export default function getCardRules(card: Card) : CardRules {
    switch(card) {
        case Card.Farmer: return new Farmer()
        case Card.Florist: return new Florist()
        case Card.Innkeeper: return new Innkeeper()
        case Card.Mason: return new Mason()
        case Card.Miner: return new Miner()
        case Card.Pickler: return new Pickler()
        case Card.RatCatcher: return new RatCatcher()
        case Card.Shepherd: return new Shepherd()
        
        case Card.Cathedral: return new Cathedral()
        case Card.Dungeon: return new Dungeon()
        case Card.Labyrinth: return new Labyrinth()
        case Card.Moat: return new Moat()
        case Card.Monastery: return new Monastery()
        case Card.TollBridge: return new TollBridge()
        case Card.Treasury: return new Treasury()
        case Card.Wall: return new Wall()
        default: throw new Error("missing card rule")
    }
}

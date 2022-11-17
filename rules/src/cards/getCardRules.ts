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
import Berserker from "./red-cards/Berserker";
import Burglar from "./red-cards/Burglar";
import Cutpurse from "./red-cards/Cutpurse";
import Outlaw from "./red-cards/Outlaw";
import Raider from "./red-cards/Raider";
import Trapper from "./red-cards/Trapper";
import Turncoat from "./red-cards/Turncoat";
import Veteran from "./red-cards/Veteran";
import Bard from "./yellow-cards/Bard";
import Doctor from "./yellow-cards/Doctor";
import Merchant from "./yellow-cards/Merchant";
import Smuggler from "./yellow-cards/Smuggler";

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

        case Card.Berserker: return new Berserker()
        case Card.Burglar: return new Burglar()
        case Card.Cutpurse: return new Cutpurse()
        case Card.Outlaw: return new Outlaw()
        case Card.Raider: return new Raider()
        case Card.Trapper: return new Trapper()
        case Card.Turncoat: return new Turncoat()
        case Card.Veteran: return new Veteran()

        case Card.Bard: return new Bard()
        case Card.Doctor: return new Doctor()
        case Card.Merchant: return new Merchant()
        case Card.Smuggler: return new Smuggler()

        default: throw new Error("missing card rule")
    }
}

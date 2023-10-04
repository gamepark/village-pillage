import Card from '../material/Card'
import Cathedral from './blue-cards/Cathedral'
import Dungeon from './blue-cards/Dungeon'
import Labyrinth from './blue-cards/Labyrinth'
import Moat from './blue-cards/Moat'
import Monastery from './blue-cards/Monastery'
import TollBridge from './blue-cards/TollBridge'
import Treasury from './blue-cards/Treasury'
import Wall from './blue-cards/Wall'
import Farmer from './green-cards/Farmer'
import Florist from './green-cards/Florist'
import Innkeeper from './green-cards/Innkeeper'
import Mason from './green-cards/Mason'
import Miner from './green-cards/Miner'
import Pickler from './green-cards/Pickler'
import RatCatcher from './green-cards/RatCatcher'
import Shepherd from './green-cards/Shepherd'
import Berserker from './red-cards/Berserker'
import Burglar from './red-cards/Burglar'
import Cutpurse from './red-cards/Cutpurse'
import Outlaw from './red-cards/Outlaw'
import Raider from './red-cards/Raider'
import Trapper from './red-cards/Trapper'
import Turncoat from './red-cards/Turncoat'
import Veteran from './red-cards/Veteran'
import Bard from './yellow-cards/Bard'
import Doctor from './yellow-cards/Doctor'
import Merchant from './yellow-cards/Merchant'
import Smuggler from './yellow-cards/Smuggler'
import { MaterialGame } from '@gamepark/rules-api'

export const CardRules = {
    [Card.Farmer]: Farmer,
    [Card.Florist]: Florist,
    [Card.Innkeeper]: Innkeeper,
    [Card.Mason]: Mason,
    [Card.Miner]: Miner,
    [Card.Pickler]: Pickler,
    [Card.RatCatcher]: RatCatcher,
    [Card.Shepherd]: Shepherd,
    [Card.Cathedral]: Cathedral,
    [Card.Dungeon]: Dungeon,
    [Card.Labyrinth]: Labyrinth,
    [Card.Moat]: Moat,
    [Card.Monastery]: Monastery,
    [Card.TollBridge]: TollBridge,
    [Card.Treasury]: Treasury,
    [Card.Wall]: Wall,
    [Card.Berserker]: Berserker,
    [Card.Burglar]: Burglar,
    [Card.Cutpurse]: Cutpurse,
    [Card.Outlaw]: Outlaw,
    [Card.Raider]: Raider,
    [Card.Trapper]: Trapper,
    [Card.Turncoat]: Turncoat,
    [Card.Veteran]: Veteran,
    [Card.Bard]: Bard,
    [Card.Doctor]: Doctor,
    [Card.Merchant]: Merchant,
    [Card.Smuggler]: Smuggler,
}
export const getCardRules = (game: MaterialGame, card: Card) => new CardRules[card](game)

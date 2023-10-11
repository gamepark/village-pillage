import Card from '@gamepark/village-pillage/material/Card'
import { CardDescriptionEnglish } from './CardDescriptionEnglish'
import Berserker from '../images/fr/berserker-fr.jpg'
import Burglar from '../images/fr/burglar-fr.jpg'
import Cathedral from '../images/fr/cathedral-fr.jpg'
import Cutpurse from '../images/fr/cutpurse-fr.jpg'
import Doctor from '../images/fr/doctor-fr.jpg'
import Dungeon from '../images/fr/dungeon-fr.jpg'
import Farmer from '../images/fr/farmer-fr.jpg'
import Florist from '../images/fr/florist-fr.jpg'
import Innkeeper from '../images/fr/innkeeper-fr.jpg'
import Labyrinth from '../images/fr/labyrinth-fr.jpg'
import Mason from '../images/fr/mason-fr.jpg'
import Merchant from '../images/fr/merchant-fr.jpg'
import Miner from '../images/fr/miner-fr.jpg'
import Moat from '../images/fr/moat-fr.jpg'
import Monastery from '../images/fr/monastery-fr.jpg'
import Outlaw from '../images/fr/outlaw-fr.jpg'
import Pickler from '../images/fr/pickler-fr.jpg'
import Raider from '../images/fr/raider-fr.jpg'
import RatCatcher from '../images/fr/rat-catcher-fr.jpg'
import Shepherd from '../images/fr/shepherd-fr.jpg'
import Smuggler from '../images/fr/smuggler-fr.jpg'
import TollBridge from '../images/fr/toll-bridge-fr.jpg'
import Trapper from '../images/fr/trapper-fr.jpg'
import Treasury from '../images/fr/treasury-fr.jpg'
import Turncoat from '../images/fr/turncoat-fr.jpg'
import Veteran from '../images/fr/veteran-fr.jpg'
import Wall from '../images/fr/wall-fr.jpg'
import Bard from '../images/fr/bard-fr.jpg'


export class CardDescriptionFrench extends CardDescriptionEnglish {
  images = {
    [Card.Farmer]: Farmer,
    [Card.Florist]: Florist,
    [Card.Innkeeper]: Innkeeper,
    [Card.Mason]: Mason,
    [Card.Miner]: Miner,
    [Card.Pickler]: Pickler,
    [Card.RatCatcher]: RatCatcher,
    [Card.Shepherd]: Shepherd,
    [Card.Wall]: Wall,
    [Card.Cathedral]: Cathedral,
    [Card.Dungeon]: Dungeon,
    [Card.Labyrinth]: Labyrinth,
    [Card.Moat]: Moat,
    [Card.TollBridge]: TollBridge,
    [Card.Treasury]: Treasury,
    [Card.Monastery]: Monastery,
    [Card.Raider]: Raider,
    [Card.Berserker]: Berserker,
    [Card.Burglar]: Burglar,
    [Card.Cutpurse]: Cutpurse,
    [Card.Outlaw]: Outlaw,
    [Card.Trapper]: Trapper,
    [Card.Veteran]: Veteran,
    [Card.Turncoat]: Turncoat,
    [Card.Merchant]: Merchant,
    [Card.Bard]: Bard,
    [Card.Doctor]: Doctor,
    [Card.Smuggler]: Smuggler,
  }
}

export const cardDescriptionFrench = new CardDescriptionFrench()
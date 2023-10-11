import { CardDescription, ItemContext } from '@gamepark/react-game'
import Card from '@gamepark/village-pillage/material/Card'
import { isCustomMoveType, MaterialMove } from '@gamepark/rules-api'
import { CustomMoveType } from '@gamepark/village-pillage/rules/CustomMoveType'
import { GameCardRules } from './rules/GameCardRules'
import Berserker from '../images/en/berserker.jpg'
import Burglar from '../images/en/burglar.jpg'
import CardBack from '../images/card-back.jpg'
import Cathedral from '../images/en/cathedral.jpg'
import Cutpurse from '../images/en/cutpurse.jpg'
import Doctor from '../images/en/doctor.jpg'
import Dungeon from '../images/en/dungeon.jpg'
import Farmer from '../images/en/farmer.jpg'
import Florist from '../images/en/florist.jpg'
import Innkeeper from '../images/en/innkeeper.jpg'
import Labyrinth from '../images/en/labyrinth.jpg'
import Mason from '../images/en/mason.jpg'
import Merchant from '../images/en/merchant.jpg'
import Miner from '../images/en/miner.jpg'
import Moat from '../images/en/moat.jpg'
import Monastery from '../images/en/monastery.jpg'
import Outlaw from '../images/en/outlaw.jpg'
import Pickler from '../images/en/pickler.jpg'
import Raider from '../images/en/raider.jpg'
import RatCatcher from '../images/en/rat-catcher.jpg'
import Shepherd from '../images/en/shepherd.jpg'
import Smuggler from '../images/en/smuggler.jpg'
import TollBridge from '../images/en/toll-bridge.jpg'
import Trapper from '../images/en/trapper.jpg'
import Treasury from '../images/en/treasury.jpg'
import Turncoat from '../images/en/turncoat.jpg'
import Veteran from '../images/en/veteran.jpg'
import Wall from '../images/en/wall.jpg'
import Bard from '../images/en/bard.jpg'

export class CardDescriptionEnglish extends CardDescription {
  ratio = 326 / 499

  backImage = CardBack

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

  canLongClick(move: MaterialMove, context: ItemContext): boolean {
    const { index } = context
    if (isCustomMoveType(CustomMoveType.ChooseCard)(move)) return move.data === index

    return super.canLongClick(move, context)
  }

  rules = GameCardRules
}

export const cardDescriptionEnglish = new CardDescriptionEnglish()
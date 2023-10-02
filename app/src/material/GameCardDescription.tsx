import { CardDescription } from '@gamepark/react-game'
import Card from '@gamepark/village-pillage/material/Card'
import Images from '../images/Images'

export class GameCardDescription extends CardDescription {
  ratio = 326 / 499

  backImage = Images.CardBack

  images = {
    [Card.Farmer]: Images.Farmer,
    [Card.Florist]: Images.Florist,
    [Card.Innkeeper]: Images.Innkeeper,
    [Card.Mason]: Images.Mason,
    [Card.Miner]: Images.Miner,
    [Card.Pickler]: Images.Pickler,
    [Card.RatCatcher]: Images.RatCatcher,
    [Card.Shepherd]: Images.Shepherd,
    [Card.Wall]: Images.Wall,
    [Card.Cathedral]: Images.Cathedral,
    [Card.Dungeon]: Images.Dungeon,
    [Card.Labyrinth]: Images.Labyrinth,
    [Card.Moat]: Images.Moat,
    [Card.TollBridge]: Images.TollBridge,
    [Card.Treasury]: Images.Treasury,
    [Card.Monastery]: Images.Monastery,
    [Card.Raider]: Images.Raider,
    [Card.Berserker]: Images.Berserker,
    [Card.Burglar]: Images.Burglar,
    [Card.Cutpurse]: Images.Cutpurse,
    [Card.Outlaw]: Images.Outlaw,
    [Card.Trapper]: Images.Trapper,
    [Card.Veteran]: Images.Veteran,
    [Card.Turncoat]: Images.Turncoat,
    [Card.Merchant]: Images.Merchant,
    [Card.Bard]: Images.Bard,
    [Card.Doctor]: Images.Doctor,
    [Card.Smuggler]: Images.Smuggler,
  }

  rules = () => <p />
}

export const gameCardDescription = new GameCardDescription()
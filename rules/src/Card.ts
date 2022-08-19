import {isEnumValue} from "@gamepark/rules-api";

enum Card {
  Farmer = 10, Florist, Innkeeper, Mason, Miner, Pickler, RatCatcher, Shepherd,
  Wall = 20, Cathedral, Dungeon, Labyrinth, Moat, TollBridge, Treasury, Monastery,
  Raider = 30, Berserker, Burglar, Cutpurse, Outlaw, Trapper, Veteran, Turncoat,
  Merchant = 40, Bard, Doctor, Smuggler = 47
/*   Farmer1 = 101, Farmer2, Farmer3, Farmer4, Farmer5, Farmer6,
  Florist = 111, Innkeeper, Mason, Miner, Pickler, RatCatcher, Shepherd,
  Wall1 = 201, Wall2, Wall3, Wall4, Wall5, Wall6,
  Cathedral = 211, Dungeon, Labyrinth, Moat, TollBridge, Treasury, Monastery,
  Raider1 = 301, Raider2, Raider3, Raider4, Raider5, Raider6,
  Berserker = 311, Burglar, Cutpurse, Outlaw, Trapper, Veteran, Turncoat,
  Merchant1 = 401, Merchant2, Merchant3, Merchant4, Merchant5, Merchant6,
  Bard = 411, Doctor, Smuggler = 417 */
}

export default Card

export const cards = Object.values(Card).filter(isEnumValue)
export const marketCardsExpansion = cards.filter(card => card % 10 !== 0)
export const marketCards = marketCardsExpansion.filter(card => card % 10 !== 7)
export const startingCards = [Card.Farmer, Card.Wall, Card.Raider, Card.Merchant]
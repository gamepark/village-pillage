import {isEnumValue} from "@gamepark/rules-api";

enum Card {
  Farmer = 10, Florist, Innkeeper, Mason, Miner, Pickler, RatCatcher, Shepherd,
  Wall = 20, Cathedral, Dungeon, Labyrinth, Moat, TollBridge, Treasury, Monastery,
  Raider = 30, Berserker, Burglar, Cutpurse, Outlaw, Trapper, Veteran, Turncoat,
  Merchant = 40, Bard, Doctor, Smuggler = 47

}

export default Card

export const cards = Object.values(Card).filter(isEnumValue)
export const marketCardsExpansion = cards.filter(card => card % 10 !== 0)
export const marketCards = marketCardsExpansion.filter(card => card % 10 !== 7)

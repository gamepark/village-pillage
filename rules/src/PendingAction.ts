import Card from "./Card"
import MoveType from "./moves/MoveType"
import { getPriceToBuyCard } from "./moves/TakeMarketCard"

export default interface PendingAction {
  type: MoveType
  card?: Card
  wait?: boolean
}

export function getPendingActionCost(action: PendingAction) : number {
  switch(action.type) {
    case MoveType.TakeMarketCard: return getPriceToBuyCard(action.card!)
  }
  return 0
}
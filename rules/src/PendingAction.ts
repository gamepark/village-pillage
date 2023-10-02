import Card from "./material/Card"
import getCardRules from "./cards/getCardRules"
import MoveType from "./moves/MoveType"

export default interface PendingAction {
  type: MoveType
  card?: Card
  wait?: boolean
}

export function getPendingActionCost(action: PendingAction) : number {
  switch(action.type) {
    case MoveType.TakeMarketCard: return getCardRules(action.card!).priceToBuyCard
  }
  return 0
}
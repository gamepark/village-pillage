import Card from "./Card"
import PendingAction from "./PendingAction"

export default interface PlayerState {
  id: number
  hand: Card[]
  leftCard?: Card
  rightCard?: Card
  stock: number
  bank: number
  relics: number
  pendingActions: PendingAction[]
}
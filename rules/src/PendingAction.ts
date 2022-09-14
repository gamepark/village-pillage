import Card from "./Card"
import MoveType from "./moves/MoveType"

export default interface PendingAction {
  type: MoveType
  card?: Card
  wait?: boolean
}
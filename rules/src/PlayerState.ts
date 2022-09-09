import Card from "./Card"
import MoveType from "./moves/MoveType"

export default interface PlayerState {
  id: number
  hand: Card[]
  leftCard?: Card
  rightCard?: Card
  stock: number
  bank: number
  relics: number
  pendingActions: {type: MoveType, card?: Card, wait?: boolean}[]
}
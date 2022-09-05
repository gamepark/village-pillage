import Card from "./Card"

export default interface PlayerState {
  id: number
  hand: Card[]
  leftCard?: Card
  rightCard?: Card
  stock: number
  bank: number
  relics: number
}
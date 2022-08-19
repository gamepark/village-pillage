import Card from "./Card"

export default interface PlayerState {
  hand: Card[]
  leftCard?: Card
  rightCard?: Card
  stock: number
  bank: number
  relics: number
}
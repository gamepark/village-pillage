import MoveType from './MoveType'

type FlipChicken = {
  type: MoveType.FlipChicken
  playerId: number
}

export default FlipChicken

export function flipChickenMove(playerId: number) : FlipChicken {
  return {type: MoveType.FlipChicken, playerId}
}

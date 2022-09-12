import Card from '../Card'
import GameState, { getPlayerState } from '../GameState'
import GameView from '../GameView'
import PlayerState from '../PlayerState'
import Move from './Move'
import MoveType from './MoveType'
import { spendBankTurnipsMove } from './SpendBankTurnips'
import { spendStockTurnipsMove } from './SpendStockTurnips'

/**
 * An example of a simple move: one player take ONE relic to his bankCard
 */
type TakeRelic = {
  type: MoveType.TakeRelic
  playerId: number
}

export default TakeRelic

export function takeRelicMove(playerId: number) : TakeRelic {
  return {type: MoveType.TakeRelic, playerId}
}

export function getRelicsPrice(game: GameState) : number[] {
  return game.players.length === 2 ? [6,7,8] : [8,9,10]
}

export function buyRelic(player: PlayerState, card: Card, relicsPrice: number[]) : Move[] {
  const moves : Move[] = []
  if (getCardCanBuyRelic(card)[0]) {
    const cost = relicsPrice[player.relics] + getCardOffsetRelicPrice(card)
    if ((cost <= (player.bank + player.stock))) {
      const stockCost = Math.min(cost,player.stock)
      if (stockCost > 0) moves.push(spendStockTurnipsMove(player.id, stockCost))
      const bankCost = cost - stockCost
      if (bankCost > 0) moves.push(spendBankTurnipsMove(player.id, bankCost))
      moves.push(takeRelicMove(player.id))
    }
  } return moves
}

export function takeRelic(state: GameState | GameView, move: TakeRelic) {
  const player = getPlayerState(state, move.playerId)
  player.relics += 1
  console.log("Joueur "+player.id+" relics : " +player.relics)
}

export function getCardCanBuyRelic(card: Card) : boolean {
  switch(card) {
    case Card.Smuggler:
    case Card.Doctor:
    case Card.Bard:
    case Card.Merchant: return true
    default: return false
  }
}
export function getCardOffsetRelicPrice(card: Card) : number {
  switch(card) {
    case Card.Smuggler: return -2
    default: return 0
  }
}
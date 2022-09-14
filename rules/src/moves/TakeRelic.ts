import Card from '../Card'
import GameState, { getPlayerState } from '../GameState'
import GameView from '../GameView'
import PlayerState from '../PlayerState'
import PlayerView from '../PlayerView'
import { addPendingActionMove } from './AddPendingAction'
import { bankTurnipsMove } from './BankTurnips'
import { gainTurnipsMove } from './GainTurnips'
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

export function getRelicsPrice(game: GameState | GameView) : number[] {
  return game.players.length === 2 ? [6,7,8] : [8,9,10]
}

export function getCardBuyMoves(player: PlayerState | PlayerView, card: Card, relicsPrice: number[]) : Move[] {
  const moves : Move[] = []
  if (cardCanBuyRelic(card)) {
    const cost = relicsPrice[player.relics] + getCardOffsetRelicPrice(card)
    if ((cost <= (player.bank + player.stock))) {
      const stockCost = Math.min(cost,player.stock)
      if (stockCost > 0) moves.push(spendStockTurnipsMove(player.id, stockCost))
      const bankCost = cost - stockCost
      if (bankCost > 0) moves.push(spendBankTurnipsMove(player.id, bankCost))
      moves.push(takeRelicMove(player.id))
    } else {
      moves.push(...getAlternativeMoves(player, card))
    }
  } return moves
}

export function takeRelic(state: GameState | GameView, move: TakeRelic) {
  const player = getPlayerState(state, move.playerId)
  player.relics += 1
  console.log("Joueur "+player.id+" relics : " +player.relics)
}

export function cardCanBuyRelic(card: Card) : boolean {
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

function getAlternativeMoves(player: PlayerState | PlayerView, card: Card) {
  const moves: Move[] = []
  switch(card) {
    case Card.Smuggler: 
      if (player.bank > 0) moves.push(bankTurnipsMove(player.id, -player.bank))
      break
    case Card.Doctor:
      moves.push(gainTurnipsMove(player.id, 2))
      // TODO exhaust opponent card
      break
    case Card.Bard:
      moves.push(gainTurnipsMove(player.id, 1))
      // TODO Draw first card
      break
    case Card.Merchant:
      moves.push(addPendingActionMove(player.id, {type: MoveType.TakeMarketCard , card, wait: true}))
  }



  return moves
}

import Card from "./Card"
import Move from "./moves/Move"
import { spendBankTurnipsMove } from "./moves/SpendBankTurnips"
import { spendStockTurnipsMove } from "./moves/SpendStockTurnips"
import PendingAction, { getPendingActionCost } from "./PendingAction"
import PlayerView from "./PlayerView"

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

export function getPlayerTurnips(player: PlayerState | PlayerView) {
  return player.bank + player.stock
}

export function getFuturePlayerTurnips(player: PlayerState | PlayerView) {
  return getPlayerTurnips(player) - player.pendingActions.reduce((sum, action) => sum + getPendingActionCost(action), 0)
}

export function getSpendTurnipsMoves(player: PlayerState | PlayerView, turnips: number) {
  const moves : Move[] = []
  const stockCost = Math.min(turnips,player.stock)
  if (stockCost > 0) moves.push(spendStockTurnipsMove(player.id, stockCost))
  const bankCost = turnips - stockCost
  if (bankCost > 0) moves.push(spendBankTurnipsMove(player.id, bankCost))
  return moves
}
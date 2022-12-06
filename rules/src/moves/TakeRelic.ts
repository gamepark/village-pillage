import Card from '../Card'
import GameState, { getPlayerState } from '../GameState'
import GameView from '../GameView'
import PlayerState, { getSpendTurnipsMoves } from '../PlayerState'
import PlayerView from '../PlayerView'
import getCardRules from '../cards/getCardRules'
import Move from './Move'
import MoveType from './MoveType'

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
  // if (cardCanBuyRelic(card))
  if (getCardRules(card).canBuyRelic === true) {
    const cost = relicsPrice[player.relics] + getCardRules(card).offsetRelicPrice // ..ics] + getCardOffsetRelicPrice(card)
    if ((cost <= (player.bank + player.stock))) {
      moves.push(...getSpendTurnipsMoves(player,cost))
      moves.push(takeRelicMove(player.id))
    } else {
      // moves.push(...getAlternativeMoves(player, card))
      moves.push(...getCardRules(card).getAlternativeMoves(player))
    }
  } return moves
}

export function takeRelic(state: GameState | GameView, move: TakeRelic) {
  const player = getPlayerState(state, move.playerId)
  player.relics += 1
  console.log("Joueur "+player.id+" relics : " +player.relics) // TEST à enlever
}

/* FONCTIONS UTILISEES AVANT D'ETRE DELEGUE POUR CHAQUE CARTE INDIVIDUELLEMENT
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
} */

/* UNE FONCTION QUE L'ON A A NOUVEAU DELEGUEE AUX CARTES 
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
      if (getFuturePlayerTurnips(player) >= getCardRules(card).priceToBuyCard) {
        moves.push(addPendingActionMove(player.id, {type: MoveType.TakeMarketCard , card, wait: true}))
      }
  }
  return moves
} */


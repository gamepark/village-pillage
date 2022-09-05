import Card from "./Card";
import EffectType from "./EffectType";
import GameState from "./GameState";
import GainTurnips, { gainTurnipsMove } from "./moves/GainTurnips";
import Move from "./moves/Move";
import PlayerState from "./PlayerState";
import ResolveStep from "./ResolveStep";
import Side from "./Side";

enum CardColor {
  Green = 1, Blue, Red, Yellow
}

export default CardColor

export function getCardsAutomaticMoves(state : GameState, resolveStep : ResolveStep) : Move[] {
  switch (resolveStep.effectType) {
    case EffectType.Gain : return getGainMoves(state.players, resolveStep.cardColor)
    case EffectType.Steal : return getStealMoves(state.players, resolveStep.cardColor)
    case EffectType.Bank : return getBankMoves(state.players, resolveStep.cardColor)
    case EffectType.Buy : return getBuyMoves(state.players, resolveStep.cardColor)
  }
  
}


function getGainMoves(players: PlayerState[], cardColor: CardColor) {
  return players.flatMap((player, index) => getPlayerGainMoves(player, cardColor, side => getOpponentCardColor(players, index, side)))
}
function getPlayerGainMoves(player: PlayerState, cardColor: CardColor, getOpposingCardColorBySide : (side: Side) => CardColor): GainTurnips[] {
  const moves: GainTurnips[] = []
  for (const side of [Side.LEFT, Side.RIGHT]) {
    const card = side===Side.LEFT ? player.leftCard : player.rightCard
    if (card && getCardColor(card) === cardColor) {
      const gain = getCardGain(card, () => getOpposingCardColorBySide(side))
      if (gain > 0) moves.push(gainTurnipsMove(player.id, gain))
    }
  }
  return moves
}
function getCardGain(card: Card, getOpposingCardColor: () => CardColor) : number {
  switch (card) {
    case Card.Farmer: return 3
    case Card.Florist: return 5
    case Card.Innkeeper: return getOpposingCardColor() === CardColor.Yellow ? 5 : 4
    // TODO
    default: return 0
  }
}
function getOpponentCardColor(players: PlayerState[], index: number, side: Side): CardColor {
  if(side===Side.LEFT) {
    const leftOpponent = players[index+1 % players.length]
    return getCardColor(leftOpponent.rightCard!)
  } else {
    const rightOpponent = players[index-1 + players.length % players.length]
    return getCardColor(rightOpponent.leftCard!)
  }
}




function getStealMoves(_players: PlayerState[], _cardColor: CardColor) {
  return []
}

function getBankMoves(_players: PlayerState[], _cardColor: CardColor) {
  return []
}

function getBuyMoves(_players: PlayerState[], _cardColor: CardColor) {
  return []
}

export function getCardColor(card : Card) : CardColor {
  return Math.floor(card/100)
}



/* function wallMoves(state : GameState, playerId : number) : Move[] {
  const moves : Move[] = []
  moves.push(gainTurnipsMove(playerId, 1))

  // deuxième action
  const player = getPlayerState(state, playerId)
  const bank = Math.min(1,player.stock,maxBankable(player,state.players.length))
  if (bank > 0) moves.push(bankTurnipsMove(playerId, bank))
  return moves
} */






/* function getRedCardsAutomaticMoves(players: PlayerState[]) {
  const moves : Move[] = []
  for (var playerIndex = 0 ; playerIndex < players.length; playerIndex++) {
    const player = players[playerIndex]
    if (player.leftCard === Card.Raider) {
      moves.push(stealTurnipsMove(playerIndex+1, 4, Side.LEFT))
    }
    if (player.rightCard === Card.Raider) {
      moves.push(stealTurnipsMove(playerIndex+1, 4, Side.RIGHT))
    }
  }
  return moves
} */


/*   const moves : Move[] = []
  for (var playerIndex = 0 ; playerIndex < state.players.length; playerIndex++) {
    const player = state.players[playerIndex]
    if(player.leftCard && getCardColor(player.leftCard)===resolveStep.cardColor) {
      moves.push(...getCardAutomaticMoves(player.leftCard, playerIndex))
    }
    if(player.rightCard && getCardColor(player.rightCard)===resolveStep.cardColor) {
      moves.push(...getCardAutomaticMoves(player.rightCard, playerIndex))
    }
  }
  return moves */
import Card from "./Card";
import { bankTurnipsMove } from "./moves/BankTurnips";
import { gainTurnipsMove } from "./moves/GainTurnips";
import Move from "./moves/Move";
import { stealTurnipsMove } from "./moves/StealTurnips";
import PlayerState from "./PlayerState";
import Side from "./Side";

enum CardColor {
  Green = 1, Blue, Red, Yellow
}

export default CardColor

export function getCardsAutomaticMoves(players : PlayerState[], step : CardColor) {
  switch (step) {
    case CardColor.Green : return getGreenCardsAutomaticMoves(players)
    case CardColor.Blue : return getBlueCardsAutomaticMoves(players)
    case CardColor.Red : return getRedCardsAutomaticMoves(players)
    case CardColor.Yellow : return[]
  }
    
}

function getGreenCardsAutomaticMoves(players: PlayerState[]) {
  const moves : Move[] = []
  for (var playerIndex = 0 ; playerIndex < players.length; playerIndex++) {
    const player = players[playerIndex]
    if (player.leftCard === Card.Farmer) {
      moves.push(gainTurnipsMove(playerIndex+1, 3))  // playerId = (playerIndex + 1) TOUJOURS !
    }
    if (player.rightCard === Card.Farmer) {
      moves.push(gainTurnipsMove(playerIndex+1, 3))
    }
  }
  return moves
}

function getBlueCardsAutomaticMoves(players: PlayerState[]) {
  const moves : Move[] = []
  for (var playerIndex = 0 ; playerIndex < players.length; playerIndex++) {
    const player = players[playerIndex]
    if (player.leftCard === Card.Wall) {
      moves.push(gainTurnipsMove(playerIndex+1, 1))
      moves.push(bankTurnipsMove(playerIndex+1, 1))
    }
    if (player.rightCard === Card.Wall) {
      moves.push(gainTurnipsMove(playerIndex+1, 1))
      moves.push(bankTurnipsMove(playerIndex+1, 1))
    }
  }
  return moves
}

function getRedCardsAutomaticMoves(players: PlayerState[]) {
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
}
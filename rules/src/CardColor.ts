import Card from "./Card";
import { gainTurnipsMove } from "./moves/GainTurnips";
import Move from "./moves/Move";
import PlayerState from "./PlayerState";

enum CardColor {
  Green = 1, Blue, Red, Yellow
}

export default CardColor

export function getCardsAutomaticMoves(players : PlayerState[], step : CardColor) {
  switch (step) {
    case CardColor.Green : return getGreenCardsAutomaticMoves(players)
    case CardColor.Blue : return[]
    case CardColor.Red : return[]
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
      moves.push(gainTurnipsMove(playerIndex+1, 3))  // playerId = (playerIndex + 1) TOUJOURS !
    }
  }
  return moves
}

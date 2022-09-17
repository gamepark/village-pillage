import Card from "./Card";
import PlayerState from "./PlayerState";
import Side from "./Side";
import { CardColor, getCardColor } from "./CardColor";

export function getOpponent(players: PlayerState[], activePlayerIndex: number, side: Side): PlayerState {
    if (side === Side.LEFT) {
        return players[(activePlayerIndex + 1) % players.length];
      } else {
        return players[(activePlayerIndex - 1 + players.length) % players.length];
      }
}

export function getOpponentCard(players: PlayerState[], activePlayerIndex: number, side: Side): Card {
    const neighbor = getOpponent(players, activePlayerIndex, side)
    if (side === Side.LEFT) {
    return neighbor.rightCard!;
  } else {
    return neighbor.leftCard!;
  }
}
export function getOpponentCardColor(players: PlayerState[], index: number, side: Side): CardColor {
  return getCardColor(getOpponentCard(players, index, side));
}
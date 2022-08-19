import GameView from "@gamepark/village-pillage/GameView"

enum PlayerPosition{
Bottom, Top, BottomLeft, TopLeft, BottomRight, TopRight, Right, Left

}

export default PlayerPosition

const playersPositions = [
    [PlayerPosition.Bottom, PlayerPosition.Top],
    [PlayerPosition.Bottom, PlayerPosition.TopLeft, PlayerPosition.TopRight],
    [PlayerPosition.Bottom, PlayerPosition.Left, PlayerPosition.Top, PlayerPosition.Right],
    [PlayerPosition.Bottom, PlayerPosition.BottomLeft, PlayerPosition.TopLeft, PlayerPosition.TopRight, PlayerPosition.BottomRight],
    [PlayerPosition.Bottom, PlayerPosition.BottomLeft, PlayerPosition.TopLeft, PlayerPosition.Top, PlayerPosition.TopRight, PlayerPosition.BottomRight]
]

export function getPlayerPosition(game:GameView, playerIndex:number, myPlayerId? :number):PlayerPosition{
    const myPlayerIndex = myPlayerId ? myPlayerId-1 : 0;
    const playerRelativeIndex = (playerIndex - myPlayerIndex + game.players.length) % game.players.length;
    return playersPositions[game.players.length-2][playerRelativeIndex]
}
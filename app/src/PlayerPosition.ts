import GameView from "@gamepark/village-pillage/GameView"

enum PlayerPosition{
Bottom, Top, BottomLeft, TopLeft, BottomRight, TopRight

}

export default PlayerPosition

export function getPlayerPosition(game:GameView, playerIndex:number, myPlayerIndex:number=0):PlayerPosition{
    if (playerIndex === myPlayerIndex ){
        return PlayerPosition.Bottom
    }

    switch(game.players.length){
        case 3 : {
            switch((playerIndex - myPlayerIndex + game.players.length) % game.players.length){
                case 1 :{
                    return PlayerPosition.TopLeft
                }
                default :{
                    return PlayerPosition.TopRight
                }
            }
           
        }

        // Cas n°2
        default : {
            return PlayerPosition.Top
        }

    }
}
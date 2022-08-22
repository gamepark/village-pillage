/** @jsxImportSource @emotion/react */
import PlayerState from '@gamepark/village-pillage/PlayerState'
import PlayerView, { isPlayerView } from '@gamepark/village-pillage/PlayerView'

import OtherPlayerHand from './OtherPlayerHand'
import PlayerHand from './PlayerHand'
import PlayerStockTurnips from './PlayerStockTurnips'
import PlayerPosition from './PlayerPosition'

type Props={
    player:PlayerState | PlayerView
    position: PlayerPosition
}


export default function PlayerDisplay({player, position}: Props) {

    console.log("Position is :" + position)
    console.log("Player is :" + player + "his Stock is :" + player.stock)

  return(
    <>
      {isPlayerView(player)? <OtherPlayerHand hand={player.hand} position={position}/> : <PlayerHand hand={player.hand}/>}
      <PlayerStockTurnips stock={player.stock} position={position}/>
    </>
  )
}

/** @jsxImportSource @emotion/react */
import PlayerState from '@gamepark/village-pillage/PlayerState'
import PlayerView, { isPlayerView } from '@gamepark/village-pillage/PlayerView'
import OtherPlayerHand from './OtherPlayerHand'
import PlayerHand from './PlayerHand'
import PlayerPosition from './PlayerPosition'

type Props={
    player:PlayerState | PlayerView
    position: PlayerPosition
}


export default function PlayerDisplay({player, position}: Props) {

    console.log(position)

  return(
    <>
    {isPlayerView(player)? <OtherPlayerHand hand={player.hand} position={position}/> : <PlayerHand hand={player.hand}/>} 
    </>
  )
}

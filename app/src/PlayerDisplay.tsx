/** @jsxImportSource @emotion/react */
import PlayerState from '@gamepark/village-pillage/PlayerState'
import PlayerView, { isPlayerView } from '@gamepark/village-pillage/PlayerView'

import OtherPlayerHand from './OtherPlayerHand'
import PlayerHand from './PlayerHand'
import PlayerStockTurnips from './PlayerStockTurnips'
import PlayerPosition from './PlayerPosition'
import PlayerBankDisplay from './PlayerBankDisplay'

type Props={
    player: PlayerState | PlayerView
    position: PlayerPosition
    duel: boolean
}


export default function PlayerDisplay({player, position, duel}: Props) {
  return(
    <>
      {isPlayerView(player)? <OtherPlayerHand hand={player.hand} position={position}/> : <PlayerHand hand={player.hand}/>}
      <PlayerStockTurnips stock={player.stock} position={position}/>
      <PlayerBankDisplay duel={duel} inBank={player.bank} position={position}/>
    </>
  )
}
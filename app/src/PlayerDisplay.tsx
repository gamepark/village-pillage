/** @jsxImportSource @emotion/react */
import PlayerState from '@gamepark/village-pillage/PlayerState'
import PlayerView, { isPlayerView } from '@gamepark/village-pillage/PlayerView'

import OtherPlayerHand from './OtherPlayerHand'
import PlayerHand from './PlayerHand'
import PlayerStockTurnips from './PlayerStockTurnips'
import PlayerPosition from './PlayerPosition'
import PlayerBankDisplay from './PlayerBankDisplay'
import CardDisplay from './material/CardDisplay'
import { css } from '@emotion/react'
import { screenRatio } from './styles'
import Side from '@gamepark/village-pillage/Side'

type Props={
    player: PlayerState | PlayerView
    position: PlayerPosition
    players : number
}


export default function PlayerDisplay({player, position, players}: Props) {
  return(
    <>
      <PlayerStockTurnips stock={player.stock} position={position}/>
      <PlayerBankDisplay duel={players===2} inBank={player.bank} position={position}/>
      {(player.rightCard || (isPlayerView(player) && player.rightCardPlayed)) && 
              <CardDisplay card = {player.rightCard} css={[playedCardCss,playedRightCardPositionCss(position, players)]}/>
      }
      {(player.leftCard || (isPlayerView(player) && player.leftCardPlayed)) && 
              <CardDisplay card = {player.leftCard} css={[playedCardCss,playedLeftCardPositionCss(cardLeftPositionPlayers[players-2])]}/>
      }
      {isPlayerView(player)? <OtherPlayerHand hand={player.hand} position={position}/> : <PlayerHand hand={player.hand}/>}
    </>
  )
}

// Absolute PlayedCard position
const cardSize = 1
const playedCardCss = css`font-size: ${cardSize}em`

/* const playedCardPositionCss = (position : PlayedCardPosition) => {
        const topCardPosition = topPosition[position]
        const leftCardPosition = leftPosition[position]
  return css`
  top: ${topCardPosition}em;
  left: ${leftCardPosition}em;`
} */
type PlayedCardPosition = {
  top : number
  left : number
  rotate? : number
}
/* const playedRightCardPositionCss = (players : number) => {
  const {top, left, rotate=0} = cardRightPositionPlayers[players-2]
  return css`
    position: absolute;
    top: ${top}em;
    left: ${left}em;
    transform: rotate(${rotate}deg);
  `
  const cardRightPositionPlayers : PlayedCardPosition[] = [
  {top: 65, left: 75*screenRatio},
  {top: 65, left: 75*screenRatio},
  {top: 65, left: 75*screenRatio},
  {top: 65, left: 75*screenRatio},
  {top: 65, left: 75*screenRatio}
]
} */
const rightCardX : Record<PlayerPosition,(players:number) => number> = {
  [PlayerPosition.Bottom] : players => {
      switch (players) {
        case 2: return 75*screenRatio
        case 3: return 75*screenRatio
        case 4: return 70*screenRatio
        default: return 60*screenRatio
      }
  },
  [PlayerPosition.Top] : players => players===2 ? 25*screenRatio : (players===4 ? 30*screenRatio : 40*screenRatio),  // players === 6
  [PlayerPosition.TopLeft] : players => players===3 ? 25*screenRatio : (players===5 ? 30*screenRatio : 40*screenRatio), // players === 6
  [PlayerPosition.TopRight] : players => players===3 ? 25*screenRatio : (players===5 ? 30*screenRatio : 40*screenRatio), // players === 6
  [PlayerPosition.BottomRight] : players => players===5 ? 30*screenRatio : 40*screenRatio, // players === 6
  [PlayerPosition.BottomLeft] : players => players===5 ? 30*screenRatio : 40*screenRatio, // players === 6,
  [PlayerPosition.Left] : () => 25*screenRatio, // only for 4 players
  [PlayerPosition.Right] : () => 25*screenRatio, // only for 4 players
}
function playedCardRotate (playerPosition : PlayerPosition, players : number, side : Side) {
  if (players >= 5) {
    if ((playerPosition===PlayerPosition.TopLeft && side===Side.RIGHT) || (playerPosition===PlayerPosition.BottomLeft && side===Side.LEFT )) {
      return 90
    }
    if ((playerPosition===PlayerPosition.TopRight && side===Side.LEFT) || (playerPosition===PlayerPosition.BottomRight && side===Side.RIGHT )) {
      return -90
    }
  }
  return 0
}

const playedRightCardPositionCss = (playerPosition : PlayerPosition, players : number) => css`
    position: absolute;
    top: 0 em;
    left: ${rightCardX[playerPosition](players)}em;
    transform: rotate(${playedCardRotate(playerPosition,players,Side.RIGHT)}deg);
  `




const playedLeftCardPositionCss = ({top, left, rotate} : PlayedCardPosition) => {
  return css`
  position: absolute;
  top: ${top}em;
  left: ${left}em;
  transform: rotate(${rotate}deg);
`
}
const cardLeftPositionPlayers = [
  {top: 65, left: 25*screenRatio},
  {top: 65, left: 25*screenRatio},
  {top: 65, left: 25*screenRatio},
  {top: 65, left: 25*screenRatio},
  {top: 65, left: 25*screenRatio}
]

/* // Absolute Player/playedCard position
const topPosition : Record<PlayedCardPosition,number> = {
  PlayedCardPosition.top = 56.5
  PlayerPosition.left = 35
}
const leftPosition : Record<PlayedCardPosition,number> = {
  [PlayerPosition.Bottom] : 50 * screenRatio - cardWidth/2,
  [PlayerPosition.Top] : 56 * screenRatio - cardWidth/2,
  [PlayerPosition.BottomLeft] : 4.3* screenRatio - cardWidth/2,
  [PlayerPosition.BottomRight] : 95.7* screenRatio - cardWidth/2,
  [PlayerPosition.TopLeft] : 4.3* screenRatio - cardWidth/2,
  [PlayerPosition.TopRight] : 95.7* screenRatio - cardWidth/2,
  [PlayerPosition.Right] : 4.5* screenRatio - cardWidth/2,
  [PlayerPosition.Left] : 95.5* screenRatio - cardWidth/2
} */
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
/* import Side from '@gamepark/village-pillage/Side' */

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
              <CardDisplay card = {player.leftCard} css={[playedCardCss,playedLeftCardPositionCss(position, players)]}/>
      }
      {isPlayerView(player)? <OtherPlayerHand hand={player.hand} position={position}/> : <PlayerHand hand={player.hand}/>}
    </>
  )
}

// PlayedCard dimension
const cardSize = 1
const playedCardCss = css`font-size: ${cardSize}em`

/// Phase 5 : Affichage les cartes gauche et droite pour chaque joueur dans la vue du joueur actif.
const playedRightCardPositionCss = (playerPosition : PlayerPosition, players : number) => css`
  position: absolute;
  top: ${rightCardY[playerPosition](players)}em;
  left: ${rightCardX[playerPosition](players)}em;
  transform: rotate(${playedCardRotate(playerPosition,players,Side.RIGHT)}deg);
`
const playedLeftCardPositionCss = (playerPosition : PlayerPosition, players : number) => css`
  position: absolute;
  top: ${leftCardY[playerPosition](players)}em;
  left: ${leftCardX[playerPosition](players)}em;
  transform: rotate(${playedCardRotate(playerPosition,players,Side.LEFT)}deg);
`

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

const rightCardY : Record<PlayerPosition,(players:number) => number> = {
  [PlayerPosition.Bottom] : players => {
      switch (players) {
        case 6: return 75
        case 5: return 75
        case 4: return 70
        default: return 75
      }
  },
  [PlayerPosition.Top] : () => 9,
  [PlayerPosition.TopLeft] : players => players===3 ? 15 : (players===5 ? 20 : 25), // players === 6
  [PlayerPosition.TopRight] : () => 9,
  [PlayerPosition.BottomRight] : () => 45,
  [PlayerPosition.BottomLeft] : () => 55,
  [PlayerPosition.Left] : () => 25, // only for 4 players
  [PlayerPosition.Right] : () => 25 // only for 4 players
}

const leftCardX : Record<PlayerPosition,(players:number) => number> = {
  [PlayerPosition.Bottom] : players => {
      switch (players) {
        case 2: return 25*screenRatio
        case 3: return 25*screenRatio
        case 4: return 30*screenRatio
        default: return 40*screenRatio
      }
  },
  [PlayerPosition.Top] : players => players===2 ? 75*screenRatio : (players===4 ? 70*screenRatio : 60*screenRatio),  // players === 6
  [PlayerPosition.TopLeft] : players => players===3 ? 75*screenRatio : (players===5 ? 70*screenRatio : 60*screenRatio), // players === 6
  [PlayerPosition.TopRight] : players => players===3 ? 75*screenRatio : (players===5 ? 70*screenRatio : 60*screenRatio), // players === 6
  [PlayerPosition.BottomRight] : players => players===5 ? 70*screenRatio : 60*screenRatio, // players === 6
  [PlayerPosition.BottomLeft] : players => players===5 ? 70*screenRatio : 60*screenRatio, // players === 6,
  [PlayerPosition.Left] : () => 75*screenRatio, // only for 4 players
  [PlayerPosition.Right] : () => 75*screenRatio, // only for 4 players
}

const leftCardY : Record<PlayerPosition,(players:number) => number> = {
  [PlayerPosition.Bottom] : players => {
      switch (players) {
        case 6: return 75
        case 5: return 75
        case 4: return 70
        default: return 75
      }
  },
  [PlayerPosition.Top] : () => 9,
  [PlayerPosition.TopLeft] : () => 9,
  [PlayerPosition.TopRight] : players => players===3 ? 15 : (players===5 ? 20 : 25), // players === 6
  [PlayerPosition.BottomRight] : () => 55,
  [PlayerPosition.BottomLeft] : () => 45,
  [PlayerPosition.Left] : () => 25, // only for 4 players
  [PlayerPosition.Right] : () => 25 // only for 4 players
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
/// FIN de Phase 5



/* // PHASE 1 : Affichage de la carte drop du joueur actif uniquement, gauche et droite au même endroit 
const playedCardPositionCss = (position : PlayerPosition) => {
  const topCardPosition = topPosition[position]
  const leftCardPosition = leftPosition[position]
return css`
position: absolute;
top: ${topCardPosition}em;
left: ${leftCardPosition}em;`
}

// Les 2 map(Record) de l'enum PlayerPosition avec la valeur souhaité pour chacun de ses membres.
const topPosition : Record<PlayerPosition,number> = {
[PlayerPosition.Bottom] : 52,
[PlayerPosition.Top] : 8,
[PlayerPosition.BottomLeft] : 85,
[PlayerPosition.BottomRight] : 85,
[PlayerPosition.TopLeft] : 8,
[PlayerPosition.TopRight] : 8,
[PlayerPosition.Right] : 34,
[PlayerPosition.Left] : 34
}
const leftPosition : Record<PlayerPosition,number> = {
[PlayerPosition.Bottom] : 85 * screenRatio - cardWidth/2,
[PlayerPosition.Top] : 56 * screenRatio - cardWidth/2,
[PlayerPosition.BottomLeft] : 4.3* screenRatio - cardWidth/2,
[PlayerPosition.BottomRight] : 95.7* screenRatio - cardWidth/2,
[PlayerPosition.TopLeft] : 4.3* screenRatio - cardWidth/2,
[PlayerPosition.TopRight] : 95.7* screenRatio - cardWidth/2,
[PlayerPosition.Right] : 4.5* screenRatio - cardWidth/2,
[PlayerPosition.Left] : 95.5* screenRatio - cardWidth/2
} FIN Phase 1*/

/* // Phase 2 : Affichage distinct de la carte droite et de la carte gauche du joueur actif uniquement.
// Phase 3 : Factorisation de la fonction cet affichage. On passe le tableau des propriétés PlayedCardPosition en paramètre.
type PlayedCardPosition = {     // Propriétés d'une carte jouée
  top : number,
  left : number,
  rotate? : number              // le '?' marque une propriété non nécessaire
}

// la fonction css avec l'utilisation sa destructuration avec valeur initiale 0 pour rotate.
 const playedCardPositionCss = ({top, left, rotate=0} : PlayedCardPosition) => {      // Fonction affichage de la carte de gauche ET droite. En effet on peut factoriser les 2 fonctions.
  return css`                                                                         // ATTENTION : La fonction n'affiche pour l'instant que les 2 cartes du joueur actif
  position: absolute;                                                                 // Il va falloir la réécrire pour qu'elle affiche toutes les cartes jouées dans la vu du joueur !
  top: ${top}em;
  left: ${left}em;
  transform: rotate(${rotate}deg);
`
}
const cardLeftPositionPlayers : PlayedCardPosition[] = [                              // Les deux tableaux ci-contre sont les valeurs des propriétés de la fonction 
{top: 52, left: 15*screenRatio},
{top: 52, left: 15*screenRatio},
{top: 52, left: 15*screenRatio},
{top: 56, left: 26*screenRatio},
{top: 56, left: 26*screenRatio}
]
const cardRightPositionPlayers : PlayedCardPosition[] = [
{top: 52, left: 75*screenRatio},
{top: 52, left: 75*screenRatio},
{top: 52, left: 75*screenRatio},
{top: 56, left: 65*screenRatio},
{top: 56, left: 65*screenRatio}
] FIN Phase 2 & 3*/



/* // Phase 4 (à refaire) : 2 fonctions pour gérer droite et gauche pour tous les joueurs
  // Nota : la gestion des cartes face visibles, face cachée se fait dans CardDisplay
const playedRightCardPositionCss = (players : number) => {
  const {top, left, rotate=0} = cardRightPositionPlayers[players-2]
  return css`
    position: absolute;
    top: ${top}em;
    left: ${left}em;
    transform: rotate(${rotate}deg);
  `}
const cardRightPositionPlayers : PlayedCardPosition[] = [
  {top: 65, left: 75*screenRatio},
  {top: 65, left: 75*screenRatio},
  {top: 65, left: 75*screenRatio},
  {top: 65, left: 75*screenRatio},
  {top: 65, left: 75*screenRatio}
]
 */
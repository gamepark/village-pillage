export const PlayerDisplay = () => null
// /** @jsxImportSource @emotion/react */
// import PlayerState from '@gamepark/village-pillage/PlayerState'
// import PlayerView, { isPlayerView } from '@gamepark/village-pillage/PlayerView'
//
// import OtherPlayerHand from './OtherPlayerHand'
// import PlayerHand from './PlayerHand'
// import PlayerStockTurnips from './PlayerStockTurnips'
// import PlayerPosition from './PlayerPosition'
// import PlayerBankDisplay from './PlayerBankDisplay'
// import SelectableCardDisplay from './material/CardDisplay'
// import { css } from '@emotion/react'
// import { screenRatio } from './styles'
// import Side from '@gamepark/village-pillage/Side'
// import Card from '@gamepark/village-pillage/Card'
// /* import Side from '@gamepark/village-pillage/Side' */
//
// type Props={
//     player: PlayerState | PlayerView
//     position: PlayerPosition
//     players : number
//     onClickCard? : (card : Card) => void
// }
//
// export default function PlayerDisplay({player, position, players, onClickCard}: Props) {
//   return(
//     <>
//       <PlayerBankDisplay duel={players===2} inBank={player.bank} position={position}/>
//       <PlayerStockTurnips stock={player.stock} position={position}/>
//       {(player.rightCard || (isPlayerView(player) && player.rightCardPlayed)) &&
//               <SelectableCardDisplay card={player.rightCard} css={[playedCardCss(player),playedRightCardPositionCss(position, players, !player.rightCard)]} onClick={() => onClickCard && player.rightCard && onClickCard(player.rightCard)}/>
//       }
//       {(player.leftCard || (isPlayerView(player) && player.leftCardPlayed)) &&
//               <SelectableCardDisplay card={player.leftCard} css={[playedCardCss(player),playedLeftCardPositionCss(position, players, !player.leftCard)]} onClick={() => onClickCard && player.leftCard && onClickCard(player.leftCard)}/>
//       }
//       {isPlayerView(player)? <OtherPlayerHand hand={player.hand} position={position}/> : <PlayerHand hand={player.hand}/>}
//     </>
//   )
// }
//
// // PlayedCard dimension
// const playedCardCss = (player : PlayerState | PlayerView) => {
//   let cardSize = 1
//   // eslint-disable-next-line @typescript-eslint/no-unused-expressions
//   isPlayerView(player) ? cardSize = 0.85 : 1
//   return css`font-size: ${cardSize}em`
// }
//
// /// Phase 5 : Affichage les cartes gauche et droite pour chaque joueur dans la vue du joueur actif.
// const playedRightCardPositionCss = (playerPosition : PlayerPosition, players : number, hidden : boolean) => css`
//   position: absolute;
//   top: ${rightCardY[playerPosition](players)}em;
//   left: ${rightCardX[playerPosition](players)}em;
//   transform: rotateY(${hidden ? -180 : 0}deg) rotate(${playedCardRotate(playerPosition,players,Side.RIGHT)}deg);
// `
// const playedLeftCardPositionCss = (playerPosition : PlayerPosition, players : number, hidden : boolean) => css`
//   position: absolute;
//   top: ${leftCardY[playerPosition](players)}em;
//   left: ${leftCardX[playerPosition](players)}em;
//   transform: rotateY(${hidden ? -180 : 0}deg) rotate(${playedCardRotate(playerPosition,players,Side.LEFT)}deg);
// `
//
//  const rightCardX : Record<PlayerPosition,(players:number) => number> = {
//   [PlayerPosition.Bottom] : players => {
//       switch (players) {
//         case 2: return 75.5*screenRatio
//         case 3: return 75.5*screenRatio
//         case 4: return 70*screenRatio
//         default: return 65.5*screenRatio
//       }
//   },
//   [PlayerPosition.Top] : players => players===2 ? 18.5*screenRatio : (players===4 ? 30*screenRatio : 29.6*screenRatio),  // players === 6
//   [PlayerPosition.TopLeft] : players => players===3 ? 18.5*screenRatio : (players===5 ? 14*screenRatio : 14*screenRatio), // players === 6
//   [PlayerPosition.TopRight] : players => players===6 ? 87.8*screenRatio : 61.5*screenRatio, // players === 3 ou 5
//   [PlayerPosition.BottomRight] : players => players===5 ? 95*screenRatio : 95*screenRatio, // players === 6
//   [PlayerPosition.BottomLeft] : players => players===5 ? 20.2*screenRatio : 20.2*screenRatio, // players === 6,
//   [PlayerPosition.Left] : () => 25*screenRatio, // only for 4 players
//   [PlayerPosition.Right] : () => 25*screenRatio, // only for 4 players
// }
//
// const rightCardY : Record<PlayerPosition,(players:number) => number> = {
//   [PlayerPosition.Bottom] : players => {
//       switch (players) {
//         case 6: return 56 //62.15
//         case 5: return 56
//         case 4: return 70
//         case 3: return 45
//         default: return 45
//       }
//   },
//   [PlayerPosition.Top] : () => 26,
//   [PlayerPosition.TopLeft] : players => players===3 ? 26 : 30.5, // players === 5 ou 6
//   [PlayerPosition.TopRight] : () => 10,
//   [PlayerPosition.BottomRight] : () => 47.1,
//   [PlayerPosition.BottomLeft] : () => 70,
//   [PlayerPosition.Left] : () => 25, // only for 4 players
//   [PlayerPosition.Right] : () => 25 // only for 4 players
// }
//
// const leftCardX : Record<PlayerPosition,(players:number) => number> = {
//   [PlayerPosition.Bottom] : players => {
//       switch (players) {
//         case 2: return 15*screenRatio
//         case 3: return 15*screenRatio
//         case 4: return 30*screenRatio
//         default: return 25.2*screenRatio
//       }
//   },
//   [PlayerPosition.Top] : players => players===2 ? 89.5*screenRatio : (players===4 ? 70*screenRatio : 78.5*screenRatio),  // players === 6
//   [PlayerPosition.TopLeft] : players => players===6 ? 20.2*screenRatio : 52*screenRatio, // players === 3 ou 5
//   [PlayerPosition.TopRight] : players => players===3 ? 89.5*screenRatio : 95*screenRatio, // players === 5 ou 6
//   [PlayerPosition.BottomRight] : players => players===5 ? 87.8*screenRatio : 87.8*screenRatio, // players === 6
//   [PlayerPosition.BottomLeft] : players => players===5 ? 14*screenRatio : 14*screenRatio, // players === 6,
//   [PlayerPosition.Left] : () => 75*screenRatio, // only for 4 players
//   [PlayerPosition.Right] : () => 75*screenRatio, // only for 4 players
// }
//
// const leftCardY : Record<PlayerPosition,(players:number) => number> = {
//   [PlayerPosition.Bottom] : players => {
//       switch (players) {
//         case 6: return 56 //62.15
//         case 5: return 56
//         case 4: return 70
//         case 3: return 45
//         default: return 45
//       }
//   },
//   [PlayerPosition.Top] : () => 26,
//   [PlayerPosition.TopLeft] : () => 10,
//   [PlayerPosition.TopRight] : players => players===3 ? 26 : 30.5, // players === 5 ou 6
//   [PlayerPosition.BottomRight] : () => 70,
//   [PlayerPosition.BottomLeft] : () => 47.6,
//   [PlayerPosition.Left] : () => 25, // only for 4 players
//   [PlayerPosition.Right] : () => 25 // only for 4 players
// }
//
//
// function playedCardRotate (playerPosition : PlayerPosition, players : number, side : Side) {
//   if (players >= 5) {
//     if ((playerPosition===PlayerPosition.TopLeft && side===Side.RIGHT) || (playerPosition===PlayerPosition.BottomLeft && side===Side.LEFT )) {
//       return 90
//     }
//     if ((playerPosition===PlayerPosition.TopRight && side===Side.LEFT) || (playerPosition===PlayerPosition.BottomRight && side===Side.RIGHT )) {
//       return -90
//     }
//   }
//   return 0
// }
// /// FIN de Phase 5
//
//
//
// /* // PHASE 1 : Affichage de la carte drop du joueur actif uniquement, gauche et droite au même endroit
// const playedCardPositionCss = (position : PlayerPosition) => {
//   const topCardPosition = topPosition[position]
//   const leftCardPosition = leftPosition[position]
// return css`
// position: absolute;
// top: ${topCardPosition}em;
// left: ${leftCardPosition}em;`
// }
//
// // Les 2 map(Record) de l'enum PlayerPosition avec la valeur souhaité pour chacun de ses membres.
// const topPosition : Record<PlayerPosition,number> = {
// [PlayerPosition.Bottom] : 52,
// [PlayerPosition.Top] : 8,
// [PlayerPosition.BottomLeft] : 85,
// [PlayerPosition.BottomRight] : 85,
// [PlayerPosition.TopLeft] : 8,
// [PlayerPosition.TopRight] : 8,
// [PlayerPosition.Right] : 34,
// [PlayerPosition.Left] : 34
// }
// const leftPosition : Record<PlayerPosition,number> = {
// [PlayerPosition.Bottom] : 85 * screenRatio - cardWidth/2,
// [PlayerPosition.Top] : 56 * screenRatio - cardWidth/2,
// [PlayerPosition.BottomLeft] : 4.3* screenRatio - cardWidth/2,
// [PlayerPosition.BottomRight] : 95.7* screenRatio - cardWidth/2,
// [PlayerPosition.TopLeft] : 4.3* screenRatio - cardWidth/2,
// [PlayerPosition.TopRight] : 95.7* screenRatio - cardWidth/2,
// [PlayerPosition.Right] : 4.5* screenRatio - cardWidth/2,
// [PlayerPosition.Left] : 95.5* screenRatio - cardWidth/2
// } FIN Phase 1*/
//
// /* // Phase 2 : Affichage distinct de la carte droite et de la carte gauche du joueur actif uniquement.
// // Phase 3 : Factorisation de la fonction cet affichage. On passe le tableau des propriétés PlayedCardPosition en paramètre.
// type PlayedCardPosition = {     // Propriétés d'une carte jouée
//   top : number,
//   left : number,
//   rotate? : number              // le '?' marque une propriété non nécessaire
// }
//
// // la fonction css avec l'utilisation sa destructuration avec valeur initiale 0 pour rotate.
//  const playedCardPositionCss = ({top, left, rotate=0} : PlayedCardPosition) => {      // Fonction affichage de la carte de gauche ET droite. En effet on peut factoriser les 2 fonctions.
//   return css`                                                                         // ATTENTION : La fonction n'affiche pour l'instant que les 2 cartes du joueur actif
//   position: absolute;                                                                 // Il va falloir la réécrire pour qu'elle affiche toutes les cartes jouées dans la vu du joueur !
//   top: ${top}em;
//   left: ${left}em;
//   transform: rotate(${rotate}deg);
// `
// }
// const cardLeftPositionPlayers : PlayedCardPosition[] = [                              // Les deux tableaux ci-contre sont les valeurs des propriétés de la fonction
// {top: 52, left: 15*screenRatio},
// {top: 52, left: 15*screenRatio},
// {top: 52, left: 15*screenRatio},
// {top: 56, left: 26*screenRatio},
// {top: 56, left: 26*screenRatio}
// ]
// const cardRightPositionPlayers : PlayedCardPosition[] = [
// {top: 52, left: 75*screenRatio},
// {top: 52, left: 75*screenRatio},
// {top: 52, left: 75*screenRatio},
// {top: 56, left: 65*screenRatio},
// {top: 56, left: 65*screenRatio}
// ] FIN Phase 2 & 3*/
//
//
//
// /* // Phase 4 (à refaire) : 2 fonctions pour gérer droite et gauche pour tous les joueurs
//   // Nota : la gestion des cartes face visibles, face cachée se fait dans CardDisplay
// const playedRightCardPositionCss = (players : number) => {
//   const {top, left, rotate=0} = cardRightPositionPlayers[players-2]
//   return css`
//     position: absolute;
//     top: ${top}em;
//     left: ${left}em;
//     transform: rotate(${rotate}deg);
//   `}
// const cardRightPositionPlayers : PlayedCardPosition[] = [
//   {top: 65, left: 75*screenRatio},
//   {top: 65, left: 75*screenRatio},
//   {top: 65, left: 75*screenRatio},
//   {top: 65, left: 75*screenRatio},
//   {top: 65, left: 75*screenRatio}
// ]
//  */
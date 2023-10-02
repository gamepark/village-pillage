export const Market = () => null
// /** @jsxImportSource @emotion/react */
// import { css } from '@emotion/react'
// import SelectableCardDisplay from "./material/CardDisplay"
// import { cardWidth } from './styles'
//
//
//
// type Props = {
//     deck: number
//     market: number[]
// }
// export default function Market({deck, market}: Props) {
//
//   return(
//     <>
//     <div css={marketBorders}/>
//     {[...Array(Math.min (8, deck))].map( (_,index)=> <SelectableCardDisplay key={index} css={deckPosition(index)}/>)}
//     {market.map((card, index) => <SelectableCardDisplay key={card} card={card} css={cardPosition(index)} />)}
//     </>
//   )
// }
// const marketBorders = css`
// position: absolute;
// width: 88em;
// height: 26em;
// left: 44em;
// top: 29.5em;
// border: 1px solid white;
// `
//
// const cardPosition = (index : number) => {
//   return css`
//     position: absolute;
//     left:${64.4 + index * (cardWidth + 2 )}em;
//     top:31em;`
// }
// const deckPosition = (index : number) => css`
// position: absolute;
// left:${45 + index * 0.13}em;
// top:${31.4 - index * 0.13}em;
// `
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import CardDisplay from "./material/CardDisplay"
import { cardWidth } from './styles'



type Props = {
    deck: number
    market: number[]
}
export default function Market({deck, market}: Props) {

  return(
    <>
    <div css={marketBorders}/>
    {[...Array(Math.min (8, deck))].map( (_,index)=> <CardDisplay key={index} css={deckPosition(index)}/>)} 
    {market.map((card, index) => <CardDisplay key={card} card={card} css={cardPosition(index)} />)}
    </>
  )
}
const marketBorders = css`
position: absolute;
width: 88em;
height: 27em;
left: 44em;
top: 33em;
border: 1px solid white;
`

const cardPosition = (index : number) => {
  return css`
    position: absolute;
    left:${65 + index * (cardWidth + 2 )}em;
    top:35em;`
}
const deckPosition = (index : number) => css`
position: absolute;
left:${45 + index * 0.13}em;
top:${35 - index * 0.13}em;
`
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
    {[...Array(Math.min (8, deck))].map( (_,index)=> <CardDisplay key={index} css={deckPosition(index)}/>)} 
    {market.map((card, index) => <CardDisplay key={card} card={card} css={cardPosition(index)} />)}
    </>
  )
}


const cardPosition = (index : number) => css`
left:${65 + index * (cardWidth + 2 )}em;
top:30em;
`
const deckPosition = (index : number) => css`
left:${45 + index * 0.1}em;
top:${30 - index * 0.1}em;
`
/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { Hand } from "@gamepark/react-components"
import CardDisplay from "./material/CardDisplay"
import { cardHeight, cardWidth, screenRatio } from "./styles"



type Props={
  hand: number[]
}

export default function PlayerHand({hand}: Props) {


  return(
    <Hand css={handCss} > 
      {hand.map(card => <CardDisplay key={card} card={card}/>)}
    </Hand>
  )
}

const handCss = css`
width: ${cardWidth}em;
height: ${cardHeight}em;
bottom:1em;
left: ${50 * screenRatio - cardWidth/2}em;
`
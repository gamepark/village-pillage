/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { Hand } from "@gamepark/react-components"
import CardDisplay from "./material/CardDisplay"
import PlayerPosition from "./PlayerPosition"
import { cardHeight, cardWidth, screenRatio } from "./styles"



type Props={
  hand:number
  position: PlayerPosition
}

export default function OtherPlayerHand({hand, position}: Props) {

  return(
    <Hand css={[handCss,positionCss(position)]} > 
      {[...Array(hand)].map((_,index) => <CardDisplay key={index} css={cardCss}/>)}
    </Hand>
  )
}

const cardSize = 0.6;

const handCss = css`
width: ${cardWidth*cardSize}em;
height: ${cardHeight*cardSize}em;
top: 8em;
left: ${50 * screenRatio - cardWidth/2}em;
`

const cardCss = css`
font-size: ${cardSize}em;
`

const positionCss = (position : PlayerPosition) => css`
top: ${topPosition[position]}em;
left: ${leftPosition[position]}em;
`

const topPosition : Record<PlayerPosition,number> = {
  [PlayerPosition.Bottom] : 75,
  [PlayerPosition.Top] : 8,
  [PlayerPosition.BottomLeft] : 65,
  [PlayerPosition.BottomRight] : 65,
  [PlayerPosition.TopLeft] : 18,
  [PlayerPosition.TopRight] : 18,
  [PlayerPosition.Right] : 45,
  [PlayerPosition.Left] : 45
}
const leftPosition : Record<PlayerPosition,number> = {
  [PlayerPosition.Bottom] : 50 * screenRatio - cardWidth*cardSize/2,
  [PlayerPosition.Top] : 50 * screenRatio - cardWidth*cardSize/2,
  [PlayerPosition.BottomLeft] : 10* screenRatio - cardWidth*cardSize/2,
  [PlayerPosition.BottomRight] : 90* screenRatio - cardWidth*cardSize/2,
  [PlayerPosition.TopLeft] : 10* screenRatio - cardWidth*cardSize/2,
  [PlayerPosition.TopRight] : 90* screenRatio - cardWidth*cardSize/2,
  [PlayerPosition.Right] : 5* screenRatio - cardWidth*cardSize/2,
  [PlayerPosition.Left] : 95* screenRatio - cardWidth*cardSize/2
}
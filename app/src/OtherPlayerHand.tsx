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
    <Hand css={[handCss,positionCss(position)]} maxAngle={10} > 
      {[...Array(hand)].map((_,index) => <CardDisplay key={index} css={cardCss}/>)}
    </Hand>
  )
}

const cardSize = 0.45;
const handCss = css`
width: ${cardWidth*cardSize}em;
height: ${cardHeight*cardSize}em; `
/* top: 8em;
left: ${50 * screenRatio - cardWidth/2}em; */

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
  [PlayerPosition.BottomLeft] : 85,
  [PlayerPosition.BottomRight] : 85,
  [PlayerPosition.TopLeft] : 8,
  [PlayerPosition.TopRight] : 8,
  [PlayerPosition.Right] : 34,
  [PlayerPosition.Left] : 34
}
const leftPosition : Record<PlayerPosition,number> = {
  [PlayerPosition.Bottom] : 50 * screenRatio - cardWidth*cardSize/2,
  [PlayerPosition.Top] : 45 * screenRatio - cardWidth*cardSize/2,
  [PlayerPosition.BottomLeft] : 8* screenRatio - cardWidth*cardSize/2,
  [PlayerPosition.BottomRight] : 92* screenRatio - cardWidth*cardSize/2,
  [PlayerPosition.TopLeft] : 8* screenRatio - cardWidth*cardSize/2,
  [PlayerPosition.TopRight] : 92* screenRatio - cardWidth*cardSize/2,
  [PlayerPosition.Right] : 17* screenRatio - cardWidth*cardSize/2,
  [PlayerPosition.Left] : 83* screenRatio - cardWidth*cardSize/2
}
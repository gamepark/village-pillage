/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import PlayerPosition from "./PlayerPosition"
import Turnip, { turnipWidth } from "./material/Turnip"
import { screenRatio } from "./styles"


type Props={
  stock: number
  position: PlayerPosition
}

export default function PlayerStockTurnips({stock, position}: Props) {

  return(
    <> 
      {[...Array(stock)].map((_,index) => <Turnip key={index} css={turnipPositionCss(position, index)}/>)}
    </>
  )
}

const turnipPositionCss = (position : PlayerPosition, index : number) => css`
position: absolute;
top: ${topPosition[position]}em;
left: ${leftPosition[position] + index * (turnipWidth + 0.5)}em;
`
const topPosition : Record<PlayerPosition,number> = {
    [PlayerPosition.Bottom] : 65,
    [PlayerPosition.Top] : 8,
    [PlayerPosition.BottomLeft] : 65,
    [PlayerPosition.BottomRight] : 65,
    [PlayerPosition.TopLeft] : 18,
    [PlayerPosition.TopRight] : 18,
    [PlayerPosition.Right] : 45,
    [PlayerPosition.Left] : 45
  }
  const leftPosition : Record<PlayerPosition,number> = {
    [PlayerPosition.Bottom] : 60 * screenRatio,
    [PlayerPosition.Top] : 50 * screenRatio,
    [PlayerPosition.BottomLeft] : 10* screenRatio,
    [PlayerPosition.BottomRight] : 90* screenRatio,
    [PlayerPosition.TopLeft] : 10* screenRatio,
    [PlayerPosition.TopRight] : 90* screenRatio,
    [PlayerPosition.Right] : 5* screenRatio,
    [PlayerPosition.Left] : 95* screenRatio
  }
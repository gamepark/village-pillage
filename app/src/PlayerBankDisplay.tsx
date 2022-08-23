/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import PlayerPosition from "./PlayerPosition"
import Turnip from "./material/Turnip"
import { screenRatio } from "./styles"
import BankCard from "./material/BankCard"


type Props={
    inBank: number
    position: PlayerPosition
    duel: boolean
}

export default function PlayerBankDisplay({inBank, position, duel} : Props) {
  return(
    <>
      <BankCard duel={duel} css={[bankCss,bankPositionCss(position)]}/>
      {[...Array(inBank)].map((_,index) => <Turnip key={index} css={turnipBankPositionCss(position,index)}/>)}
    </>
  )
}

// Absolute BankCard position
const bankSize = 1
const bankCss = css`font-size: ${bankSize}em`

const bankPositionCss = (position : PlayerPosition) => {
        const topBankPosition = topPosition[position] +1.5
        const leftBankPosition = leftPosition[position] +28
  return css`
  position: absolute;
  top:  ${topBankPosition}em;
  left: ${leftBankPosition}em`
}

// Absolute Turnips position in bankDuel
const leftFirstColumn = 6.5
const leftSecondColumn = 9.9
const topOffset = 2.8
const turnipBankPositionCss = (position : PlayerPosition, index : number) => css`
position: absolute;
top: ${topPosition[position] +14.85 - topOffset*index}em;
left: ${leftPosition[position] +28 + (index %2 === 1 ? leftFirstColumn : leftSecondColumn) }em;
`

// Absolute Player position
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
    [PlayerPosition.Bottom] : 50 * screenRatio,
    [PlayerPosition.Top] : 50 * screenRatio,
    [PlayerPosition.BottomLeft] : 10* screenRatio,
    [PlayerPosition.BottomRight] : 90* screenRatio,
    [PlayerPosition.TopLeft] : 10* screenRatio,
    [PlayerPosition.TopRight] : 90* screenRatio,
    [PlayerPosition.Right] : 5* screenRatio,
    [PlayerPosition.Left] : 95* screenRatio
  }
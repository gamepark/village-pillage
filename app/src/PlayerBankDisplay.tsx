/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import PlayerPosition from "./PlayerPosition"
import Turnip from "./material/Turnip"
import { screenRatio } from "./styles"
import BankCard, { bankWidth } from "./material/BankCard"


type Props={
    inBank: number
    position: PlayerPosition
    duel: boolean
}

export default function PlayerBankDisplay({inBank, position, duel} : Props) {
  return(
    <>
      <BankCard duel={duel} css={[bankCss,bankPositionCss(position)]}/>
      {[...Array(inBank)].map((_,index) =>
            <Turnip key={index} css={duel ? turnipBankPositionDuelCss(position,index) : turnipBankPositionCss(position,index)}/>)}
    </>
  )
}

// Absolute BankCard position
const bankSize = 1
const bankCss = css`font-size: ${bankSize}em`

const bankPositionCss = (position : PlayerPosition) => {
        const topBankPosition = topPosition[position]
        const leftBankPosition = leftPosition[position]
  return css`
  position: absolute;
  top:  ${topBankPosition}em;
  left: ${leftBankPosition}em`
}

// Absolute Turnips position on bankDuelCard
const leftFirstColumnDuel = 6.5
const leftSecondColumnDuel = 9.9
const topOffsetDuel = 2.8

const turnipBankPositionDuelCss = (position : PlayerPosition, index : number) => css`
position: absolute;
top: ${topPosition[position] +13.35 - topOffsetDuel*index}em;
left: ${leftPosition[position] + (index %2 === 1 ? leftFirstColumnDuel : leftSecondColumnDuel) }em;
`
// Absolute Turnips position on bankCard
const leftFirstColumn = 6.3
const leftSecondColumn = 9.91
const topOffset = 2.28

const turnipBankPositionCss = (position : PlayerPosition, index: number) => css`
position: absolute;
top: ${topPosition[position] +13.6 - topOffset*index}em;
left: ${leftPosition[position] + (index %2 === 1 ? leftFirstColumn : leftSecondColumn) }em;
`

// Absolute Player/Bank position
const topPosition : Record<PlayerPosition,number> = {
    [PlayerPosition.Bottom] : 56.5,
    [PlayerPosition.Top] : 7.1,
    [PlayerPosition.BottomLeft] : 53,
    [PlayerPosition.BottomRight] : 53,
    [PlayerPosition.TopLeft] : 28.5,
    [PlayerPosition.TopRight] : 28.5,
    [PlayerPosition.Right] : 35,
    [PlayerPosition.Left] : 35
  }
  const leftPosition : Record<PlayerPosition,number> = {
    [PlayerPosition.Bottom] : 50 * screenRatio - bankWidth/2,
    [PlayerPosition.Top] : 56 * screenRatio - bankWidth/2,
    [PlayerPosition.BottomLeft] : 4.3* screenRatio - bankWidth/2,
    [PlayerPosition.BottomRight] : 95.7* screenRatio - bankWidth/2,
    [PlayerPosition.TopLeft] : 4.3* screenRatio - bankWidth/2,
    [PlayerPosition.TopRight] : 95.7* screenRatio - bankWidth/2,
    [PlayerPosition.Right] : 4.5* screenRatio - bankWidth/2,
    [PlayerPosition.Left] : 95.5* screenRatio - bankWidth/2
  }
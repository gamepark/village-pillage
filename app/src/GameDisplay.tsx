/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { GameTable } from '@gamepark/react-game'
import { pointerWithin } from '@dnd-kit/core'
import { PlayerPanels } from './panels/PlayerPanels'

export const GameDisplay = () => {
  return <>
    <GameTable
      collisionAlgorithm={pointerWithin}
      xMin={-50}
      xMax={50}
      yMin={-30}
      yMax={30} margin={{ top: 7, left: 0, right: 25, bottom: 0 }}
      css={css`background-color: rgba(255, 255, 255, 0.47)`}
    />
    <PlayerPanels />
  </>
}

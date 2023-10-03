/** @jsxImportSource @emotion/react */
import { FC } from 'react'
import { PlayerPanel, usePlayerId, usePlayers } from '@gamepark/react-game'
import { css } from '@emotion/react'
import { PlayerId } from '@gamepark/village-pillage/VillagePillageOptions'

export const PlayerPanels: FC<any> = () => {
  const playerId = usePlayerId() ?? 1
  const players = usePlayers({ sortFromMe: true })
  return (
    <>
      {players.map((player, index) => <PlayerPanel key={player.id} playerId={player.id} css={panelPosition(index, players.length, playerId)}/>)}
    </>
  )
}

const panelPosition = (index: number, players: number, player: PlayerId) => css`
  position: absolute;
  right: 1em;
  top: ${8.5 + (player === undefined ? index : (index || players) - 1) * 76.5 / (players - 1)}em;
  width: 28em;
  height: 14em;
  cursor: pointer;
`
import { PlayerId } from '@gamepark/village-pillage/VillagePillageOptions'
import { partition } from 'lodash'

// TODO: player the current player at the bottom,
// and keep the real order for placement since the whole game is based on placement
export const  getPlayerPosition = (itemPlayer: PlayerId, players: PlayerId[], player?: PlayerId) => {
  const index = getBoardIndex(itemPlayer, players, player)
  if (players.length === 2) return getTwoPlayersPosition(index)
  return getFourPlayersPosition(index)
}

export const getPlayerRotation = (itemPlayer: PlayerId, players: PlayerId[], player?: PlayerId) => {
  const index = getBoardIndex(itemPlayer, players, player)
  if (players.length === 2) return getTwoPlayersRotation(index)
  return getFourPlayersRotation(index)
}

export const getFourPlayersRotation = (index: number) => {
  switch (index) {
    case 0:
      return 0
    case 1:
      return 90
    case 2:
      return 180
    case 3:
      return 270
  }

  return 0
}

export const getTwoPlayersRotation = (index: number) => {
  switch (index) {
    case 0:
      return 0
    case 1:
      return 180
  }

  return 0
}

export const getFourPlayersPosition = (index: number) => {
  switch (index) {
    case 0:
      return { x: -7, y: 23, z: 0 }
    case 1:
      return { x: -43, y: -6, z: 0 }
    case 2:
      return { x: 7, y: -23, z: 0 }
    case 3:
      return { x: 43, y: 6, z: 0 }
  }

  return { x: 0, y: 0, z: 0}
}

export const getTwoPlayersPosition = (index: number) => {
  switch (index) {
    case 0:
      return { x: -3, y: 22, z: 0 }
    case 1:
      return { x: 0, y: -23, z: 0 }
  }

  return { x: 0, y: 0, z: 0}
}

export const getBoardIndex = (itemPlayer: PlayerId, players: PlayerId[], player?: PlayerId)=>  {
  if (!player) return players.indexOf(itemPlayer)
  if (player === itemPlayer) return 0
  if (players.length === 2) return 1
  const playerIndex = players.indexOf(player)
  const [other, before] = partition(players, (p) => players.indexOf(p) >= playerIndex)
  return [...other, ...before].indexOf(itemPlayer)
}
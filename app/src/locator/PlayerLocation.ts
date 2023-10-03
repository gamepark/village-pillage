import { PlayerId } from '@gamepark/village-pillage/VillagePillageOptions'

// TODO: player the current player at the bottom,
// and keep the real order for placement since the whole game is based on placement
export const  getPlayerPosition = (itemPlayer: PlayerId, players: PlayerId[], player?: PlayerId) => {
  const index = getBoardIndex(itemPlayer, players, player)
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

export const getBoardIndex = (itemPlayer: PlayerId, players: PlayerId[], player?: PlayerId)=>  {
  if (!player) return players.indexOf(itemPlayer)
  if (player === itemPlayer) return 0

  const playerIndex = players.indexOf(player)
  for (let i = playerIndex; i < (playerIndex + players.length); i++) {
    console.log("Loop", itemPlayer, i, playerIndex, (playerIndex + players.length), players.length)
    if (i === playerIndex) continue
    const index = i >= players.length? i % players.length: i
    if (players[index] !== itemPlayer) continue
    return index
  }

  return 0
}
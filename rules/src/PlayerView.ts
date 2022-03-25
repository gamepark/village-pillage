import PlayerState from './PlayerState'

type PlayerView = Omit<PlayerState, 'hand'> & {
  hand: number
  leftCardPlayed: boolean
  rightCardPlayed: boolean
}

export default PlayerView

export function isPlayerView(player: PlayerState | PlayerView): player is PlayerView {
  return typeof player.hand === 'number'
}
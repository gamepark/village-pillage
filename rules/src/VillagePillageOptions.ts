import {OptionsSpec} from '@gamepark/rules-api'
import GameState from './GameState'

/**
 * This is the options for each players in the game.
 */
type VillagePillagePlayerOptions = {}

/**
 * This is the type of object that the game receives when a new game is started.
 * The first generic parameter, "{}", can be changed to include game options like variants or expansions.
 */
export type VillagePillageOptions = {
  players: VillagePillagePlayerOptions[]
}

/**
 * Typeguard to help Typescript distinguish between a GameState and new game's options, for you main class constructor.
 * @param arg GameState or Game options
 * @return true if arg is a Game options
 */
export function isGameOptions(arg: GameState | VillagePillageOptions): arg is VillagePillageOptions {
  return typeof (arg as GameState).deck === 'undefined'
}

/**
 * This object describes all the options a game can have, and will be used by GamePark website to create automatically forms for you game
 * (forms for friendly games, or forms for matchmaking preferences, for instance).
 */
export const VillagePillageOptionsSpec: OptionsSpec<VillagePillageOptions> = {
  players: {}
}

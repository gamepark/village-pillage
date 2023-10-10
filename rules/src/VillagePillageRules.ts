import { isCustomMoveType, MaterialMove, SecretMaterialRules } from '@gamepark/rules-api'
import { MaterialType } from './material/MaterialType'
import { LocationType } from './material/LocationType'
import { PlayerId } from './VillagePillageOptions'
import { rules } from './configuration/RuleDefinitions'
import { hidingStrategies } from './configuration/HidingStrategies'
import { locationsStrategies } from './configuration/LocationStrategies'
import sample from 'lodash/sample'
import { CustomMoveType } from './rules/CustomMoveType'


export class VillagePillageRules extends SecretMaterialRules<PlayerId, MaterialType, LocationType> {

  rules = rules
  hidingStrategies = hidingStrategies
  locationsStrategies = locationsStrategies


  randomize(move: MaterialMove) {
    if (!isCustomMoveType(CustomMoveType.Chicken)(move)) return super.randomize(move)

    return {
      ...move,
      data: sample(move.data)
    }
  }

  protected moveBlocksUndo(move: MaterialMove): boolean {
    return isCustomMoveType(CustomMoveType.Chicken)(move) || super.moveBlocksUndo(move)
  }

  isUnpredictableMove(move: MaterialMove, playerId: PlayerId): boolean {
    return isCustomMoveType(CustomMoveType.Chicken)(move) || super.isUnpredictableMove(move, playerId)
  }
}
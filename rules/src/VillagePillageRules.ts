import { SecretMaterialRules } from '@gamepark/rules-api'
import { MaterialType } from './material/MaterialType'
import { LocationType } from './material/LocationType'
import { PlayerId } from './VillagePillageOptions'
import { rules } from './configuration/RuleDefinitions'
import { hidingStrategies } from './configuration/HidingStrategies'
import { locationsStrategies } from './configuration/LocationStrategies'

export class VillagePillageRules extends SecretMaterialRules<PlayerId, MaterialType, LocationType> {

  rules = rules
  hidingStrategies = hidingStrategies
  locationsStrategies = locationsStrategies
}
import { MaterialRulesPartCreator } from '@gamepark/rules-api'
import { RuleId } from '../rules/RuleId'
import { PlanRule } from '../rules/PlanRule'

export const rules: Record<RuleId, MaterialRulesPartCreator> = {
  [RuleId.Plan]: PlanRule
}
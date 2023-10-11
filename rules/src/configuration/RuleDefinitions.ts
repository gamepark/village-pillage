import { MaterialRulesPartCreator } from '@gamepark/rules-api'
import { RuleId } from '../rules/RuleId'
import { PlanRule } from '../rules/PlanRule'
import { GainRule } from '../rules/GainRule'
import { StealRule } from '../rules/StealRule'
import { BankRule } from '../rules/BankRule'
import { BuyRule } from '../rules/BuyRule'
import { RefreshRule } from '../rules/RefreshRule'
import { SelectNextBuyPlayerRule } from '../rules/SelectNextBuyPlayerRule'
import { RevealRule } from '../rules/RevealRule'
import { BuyMarketCardRule } from '../rules/BuyMarketCardRule'
import { ExhaustRule } from '../rules/ExhaustRule'

export const rules: Record<RuleId, MaterialRulesPartCreator> = {
  [RuleId.Plan]: PlanRule,
  [RuleId.Reveal]: RevealRule,
  [RuleId.Gain]: GainRule,
  [RuleId.Steal]: StealRule,
  [RuleId.Bank]: BankRule,
  [RuleId.Buy]: BuyRule,
  [RuleId.Refresh]: RefreshRule,
  [RuleId.SelectNextBuyPlayer]: SelectNextBuyPlayerRule,
  [RuleId.BuyMarketCard]: BuyMarketCardRule,
  [RuleId.Exhaust]: ExhaustRule
}
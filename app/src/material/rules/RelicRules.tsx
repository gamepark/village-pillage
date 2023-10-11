import { FC } from 'react'
import { MaterialRulesProps } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const RelicRules: FC<MaterialRulesProps> = (props) => {
  console.warn("You must implement RelicRules", props.itemType)
  const { t } = useTranslation()
  return <>{t('rule.relic')}</>
}
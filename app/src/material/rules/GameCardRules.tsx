import { FC } from 'react'
import { MaterialRulesProps } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const GameCardRules: FC<MaterialRulesProps> = (props) => {
  console.warn("You must implement GameCardRules", props.itemType)
  const { t } = useTranslation()
  return <>{t('rule.card')}</>
}
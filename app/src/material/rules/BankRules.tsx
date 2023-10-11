import { FC } from 'react'
import { MaterialRulesProps } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const BankRules: FC<MaterialRulesProps> = (props) => {
  console.warn("You must implement BankRule", props.itemType)
  const { t } = useTranslation()
  return <>{t('rule.bank')}</>
}
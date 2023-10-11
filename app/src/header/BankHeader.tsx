/** @jsxImportSource @emotion/react */
import { useTranslation } from 'react-i18next'

export const BankHeader = () => {
  const { t } = useTranslation()
  return <>{t('rule.header.bank')}</>
}

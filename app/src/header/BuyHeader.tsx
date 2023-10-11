/** @jsxImportSource @emotion/react */
import { useTranslation } from 'react-i18next'

export const BuyHeader = () => {
  const { t } = useTranslation()
  return <>{t('rule.header.buy')}</>
}

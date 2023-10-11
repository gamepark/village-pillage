/** @jsxImportSource @emotion/react */
import { useTranslation } from 'react-i18next'

export const BuyMarketCardHeader = () => {
  const { t } = useTranslation()
  return <>{t('rule.header.buy-market')}</>
}

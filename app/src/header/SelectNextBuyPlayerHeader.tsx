/** @jsxImportSource @emotion/react */
import { useTranslation } from 'react-i18next'

export const SelectNextBuyPlayerHeader = () => {
  const { t } = useTranslation()
  return <>{t('rule.header.select-next')}</>
}

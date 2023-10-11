/** @jsxImportSource @emotion/react */
import { useTranslation } from 'react-i18next'

export const GainHeader = () => {
  const { t } = useTranslation()
  return <>{t('rule.header.gain')}</>
}

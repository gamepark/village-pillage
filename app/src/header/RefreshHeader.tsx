/** @jsxImportSource @emotion/react */
import { useTranslation } from 'react-i18next'

export const RefreshHeader = () => {
  const { t } = useTranslation()
  return <>{t('rule.header.refresh')}</>
}

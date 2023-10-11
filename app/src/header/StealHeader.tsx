/** @jsxImportSource @emotion/react */
import { useTranslation } from 'react-i18next'

export const StealHeader = () => {
  const { t } = useTranslation()
  return <>{t('rule.header.steal')}</>
}

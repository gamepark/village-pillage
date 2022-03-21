/** @jsxImportSource @emotion/react */
import {usePlayerId} from '@gamepark/react-client'
import GameView from '@gamepark/village-pillage/GameView'
import {useTranslation} from 'react-i18next'

type Props = {
  loading: boolean
  game?: GameView
}

export default function HeaderText({loading}: Props) {
  const {t} = useTranslation()
  const playerId = usePlayerId()
  if (loading) return <>{t('Game loading...')}</>
  return <>Loaded! Now what? Your player id is {playerId}</>
}
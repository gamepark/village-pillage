/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import { usePlayerId } from '@gamepark/react-client'
import Card from '@gamepark/village-pillage/Card'
import { playCardMove } from '@gamepark/village-pillage/moves/PlayCard'
import Side from '@gamepark/village-pillage/Side'
import {useDrop} from 'react-dnd'
import {useTranslation} from 'react-i18next'
import {cardHeight, cardWidth, screenRatio} from './styles'

type Props = {
    side : Side
}

export default function CardDropArea({side} : Props) {
  const playerId = usePlayerId<number>()!
  const {t} = useTranslation()
  const [{dragging, over}, ref] = useDrop({
    accept: "handcard",
    collect: monitor => ({
      dragging: monitor.getItemType() === "handcard",
      over: monitor.isOver()
    }),
    drop: (item: {card : Card}) => playCardMove(playerId, item.card, side)
  })
  return (
    <div ref={ref} css={[style(side), !dragging && hidden, over && highlight]}>
      <span>{t('drop.card.here')}</span>
    </div>
  )
}

const style = (side : Side) => {
  return css`
  position: absolute;
  width: ${cardWidth}em;
  height: ${cardHeight}em;
  top: ${side ? 60 : 60}em;
  left: ${side ? 85*screenRatio : 15}em;
  border-radius: 2em;
  background-color: rgba(0, 128, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  
  span {
    font-size: 5em;
  }
`}

const hidden = css`
  display: none;
`

const highlight = css`
  background-color: rgba(0, 128, 0, 0.7);
`
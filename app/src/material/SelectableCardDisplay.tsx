/** @jsxImportSource @emotion/react */
import {HTMLAttributes} from 'react'
import Card from "@gamepark/village-pillage/Card";
import CardDisplay from "./CardDisplay"
import {useLongPress} from 'use-long-press'
import { canChooseCard, chooseCardMove } from '@gamepark/village-pillage/moves/ChooseCard';
import { usePlay, usePlayerId } from '@gamepark/react-client';
import GameView from '@gamepark/village-pillage/GameView';

type Props = {
  card?: Card
  game : GameView
} & HTMLAttributes<HTMLDivElement>

export default function SelectableCardDisplay({card, game}: Props) {
  const playerId = usePlayerId<number>()!
  const play = usePlay()
  const bind = useLongPress(() => canChooseCard(game,playerId) && play(chooseCardMove(playerId, card!)), {
    onCancel: () => console.log('TODO: open card rules dialog'),
    threshold: 3000
  })
  return (
    CardDisplay({...bind()})
  )
};
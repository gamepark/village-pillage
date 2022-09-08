/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { usePlay, usePlayerId } from '@gamepark/react-client';
import { Letterbox } from '@gamepark/react-components';
import Card from '@gamepark/village-pillage/Card';
import GameView from '@gamepark/village-pillage/GameView';
import { chooseCardMove } from '@gamepark/village-pillage/moves/ChooseCard';
import Phase from '@gamepark/village-pillage/Phase';
import Side from '@gamepark/village-pillage/Side';
import CardDropArea from './CardDropArea';
import Market from './Market';
import PlayerDisplay from './PlayerDisplay';
import { getPlayerPosition } from './PlayerPosition';
import PlayersBorders from './PlayersBorders';

type Props = {
  game: GameView
}

export default function GameDisplay({game}: Props) {
  const playerId = usePlayerId<number>()
  const player = playerId !== undefined ?  game.players[playerId-1] : undefined
  const play = usePlay()
  const onClickPlayerCard = (card : Card , ownerId : number) => {
    if(ownerId !== playerId) return
    // TODO : Ne pas jouer le coup si c'est pas le moment (dans game)
    play(chooseCardMove(playerId, card))
  }

  console.log(game)
  return (
    <Letterbox css={letterBoxStyle} top={0}>
      <PlayersBorders players={game.players.length}/>
      <Market market={game.market} deck={game.deck}/>
      {player && game.phase===Phase.PLAN && !player.leftCard &&<CardDropArea side={Side.LEFT}/>}
      {player && game.phase===Phase.PLAN && !player.rightCard && <CardDropArea side={Side.RIGHT}/>}
      {game.players.map((player, index) => <PlayerDisplay key={index} players={game.players.length} player={player} position={getPlayerPosition(game, index, playerId )} onClickCard={card => onClickPlayerCard(card, player.id)} />)}
    </Letterbox>
  )
}

const fadeIn = keyframes`
  from, 50% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const letterBoxStyle = css`
  animation: ${fadeIn} 3s ease-in forwards;
`



/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { usePlayerId } from '@gamepark/react-client';
import { Letterbox } from '@gamepark/react-components';
import GameView from '@gamepark/village-pillage/GameView';
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
  console.log(game)
  return (
    <Letterbox css={letterBoxStyle} top={0}>
      <PlayersBorders players={game.players.length}/>
      <Market market={game.market} deck={game.deck}/>
      {player && game.phase===Phase.PLAN && !player.leftCard &&<CardDropArea side={Side.LEFT}/>}
      {player && game.phase===Phase.PLAN && !player.rightCard && <CardDropArea side={Side.RIGHT}/>}
      {game.players.map((player, index) => <PlayerDisplay key={index} duel={game.players.length === 2} player={player} position={getPlayerPosition(game, index, playerId )} />)}
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



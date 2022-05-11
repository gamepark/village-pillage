/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { usePlayerId } from '@gamepark/react-client';
import { Letterbox } from '@gamepark/react-components';
import GameView from '@gamepark/village-pillage/GameView';
import Market from './Market';
import PlayerDisplay from './PlayerDisplay';
import { getPlayerPosition } from './PlayerPosition';

type Props = {
  game: GameView
}

export default function GameDisplay({game}: Props) {
  const playerId = usePlayerId<number>()
  return (
    <Letterbox css={letterBoxStyle} top={0}>
      <Market market={game.market} deck={game.deck}/>
      {game.players.map((player, index) => <PlayerDisplay key={index} player={player} position={getPlayerPosition(game, index, playerId )} />)}
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



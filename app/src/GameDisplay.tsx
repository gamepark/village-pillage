/** @jsxImportSource @emotion/react */
import {css, keyframes} from '@emotion/react'
import GameView from '@gamepark/village-pillage/GameView'
import {Letterbox} from '@gamepark/react-components'
import CardDisplay from "./material/CardDisplay";
import Card from "@gamepark/village-pillage/Card";

type Props = {
  game: GameView
}

export default function GameDisplay({game}: Props) {
  return (
    <Letterbox css={letterBoxStyle} top={0}>
      <div css={sampleCss}>
        {JSON.stringify(game)}
      </div>
      <CardDisplay card={Card.Farmer}/>
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

const sampleCss = css`
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: 90%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  background-color: black;
  padding: 0.5em;
  border-radius: 1em;
  word-break: break-word;
`

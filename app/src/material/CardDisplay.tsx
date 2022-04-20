/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {HTMLAttributes} from 'react'
import Images from '../images/Images'
import {cardHeight, cardWidth} from '../styles'
import Card from "@gamepark/village-pillage/Card";

type Props = {
  card?: Card
} & HTMLAttributes<HTMLDivElement>

export default function CardDisplay({card, ...props}: Props) {
  return (
    <div css={[style, card ? front(card) : hidden]} {...props}/>
  )
}

const style = css`
  position: absolute;
  width: ${cardWidth}em;
  height: ${cardHeight}em;
  transform-style: preserve-3d;
  transform: translateZ(0);
  -webkit-font-smoothing: subpixel-antialiased;
  transition: transform 1s ease-in-out;
  &:before, &:after {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-size: cover;
    backface-visibility: hidden;
    border-radius: 1em;
    box-shadow: 0 0 1em black, 0 0 1em black;
  }
  &:after {
    background-image: url(${Images.cardBack});
    transform: rotateY(-180deg);
  }
`

const front = (card: Card) => css`
  &:before {
    background-image: url(${CardImage[card]});
  }
`

const CardImage: { [key in Card]: string } = {
  [Card.Farmer]: Images.farmer,
  [Card.Florist]: Images.florist,
  [Card.Innkeeper]: Images.innkeeper,
  [Card.Mason]: Images.mason,
  [Card.Miner]: Images.miner,
  [Card.Pickler]: Images.pickler,
  [Card.RatCatcher]: Images.ratCatcher,
  [Card.Shepherd]: Images.shepherd,
  [Card.Wall]: Images.wall,
  [Card.Cathedral]: Images.cathedral,
  [Card.Dungeon]: Images.dungeon,
  [Card.Labyrinth]: Images.labyrinth,
  [Card.Moat]: Images.moat,
  [Card.TollBridge]: Images.tollBridge,
  [Card.Treasury]: Images.treasury,
  [Card.Monastery]: Images.monastery,
  [Card.Raider]: Images.raider,
  [Card.Berserker]: Images.berserker,
  [Card.Burglar]: Images.burglar,
  [Card.Cutpurse]: Images.cutpurse,
  [Card.Outlaw]: Images.outlaw,
  [Card.Trapper]: Images.trapper,
  [Card.Veteran]: Images.veteran,
  [Card.Turncoat]: Images.turncoat,
  [Card.Merchant]: Images.merchant,
  [Card.Bard]: Images.bard,
  [Card.Doctor]: Images.doctor,
  [Card.Smuggler]: Images.smuggler,
}

const hidden = css`
  transform: rotateY(180deg);
`
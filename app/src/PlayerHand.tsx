export const PlayerHand = () => null
// /** @jsxImportSource @emotion/react */
//
// import { css } from "@emotion/react"
// import { usePlay } from "@gamepark/react-client"
// import { Hand } from "@gamepark/react-components"
// import Card from "@gamepark/village-pillage/Card"
// import CardDisplay from "./material/CardDisplay"
// import { cardHeight, cardWidth, screenRatio } from "./styles"
//
//
//
// type Props={
//   hand: Card[]
// }
//
// export default function PlayerHand({hand}: Props) {
//   const play = usePlay()
//   return(
//     <Hand css={handCss} maxAngle={18} getItemProps={index => ({
//           drag: {type: "handcard" , item: {card: hand[index]}, drop: move => play(move)},
//           hoverStyle: css`transform: translateY(-25%) scale(1.5);`,
//           })} >
//       {hand.map(card => <CardDisplay key={card} css={cardCss} card={card}/>)}
//     </Hand>
//   )
// }
//
// const handCss = css`
// width: ${cardWidth}em;
// height: ${cardHeight}em;
// bottom:1em;
// left: ${50 * screenRatio - cardWidth/2}em;
// `
// const cardCss = css`
// &:before, &:after {
//   box-shadow: 0.1em 0.1em 0.5em black, 0.1em 0.1em 0.5em black, 0.1em 0.1em 0.5em black;
// }
// `
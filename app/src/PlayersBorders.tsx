/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { screenRatio } from "./styles"

type Props = {
    players : number
}

export default function PlayersBorders({players}:Props) {
    const bordersValues = bordersPlayers[players-2]
    return <>
        {bordersValues.map((borderValues,index) =>
            <div key={index} css={borderCss(borderValues)}/>
        )}
    </>
}

type BorderValues = {
    height : number
    width : number
    top : number
    left : number
    skewX? : number
    skewY? : number
    transOriginCoordX? : number
    transOriginCoordY? : number
    zIndex? : number
}
const borderCss = ({height,width,top,left,skewX,skewY,transOriginCoordX,transOriginCoordY, zIndex} : BorderValues) => {
    return css`
position: absolute;
height: ${height}em;
width: ${width}em;
top: ${top}em;
left: ${left}em;
transform-origin: ${transOriginCoordX}em ${transOriginCoordY}em;
transform: skewY(${skewY}deg) skewX(${skewX}deg);
z-index: ${zIndex};
background-color: white;
`
}
const bordersPlayers = [
    [{height: 0.1, width: 44, top: 53.5, left:0},{height: 0.1, width: 44, top: 53.5, left: 132}],
    [{height: 0.1, width: 44, top: 53.5, left:0},{height: 0.1, width: 44, top: 53.5, left: 132},{height: 26, width: 0.1, top: 7, left : 50*screenRatio}],
    // [{height: 26, width: 0.1, top: 7, left: 44},{height: 40, width: 0.1, top: 60, left: 44},{height: 26, width: 0.1, top: 7, left: 132},{height: 40, width: 0.1, top: 60, left: 132}],
    [{height: 26, width: 0.2, top: 7, left: 44, transOriginCoordX: 0, transOriginCoordY: 26, skewY: 0, skewX: 55},{height: 40, width: 0.2, top: 60, left: 44, transOriginCoordX: 0, transOriginCoordY: 0, skewY: 0, skewX: -45, zIndex: 3},{height: 26, width: 0.2, top: 7, left: 132, transOriginCoordX: 0, transOriginCoordY: 26, skewY: 0, skewX: 125},{height: 40, width: 0.2, top: 60, left: 132, transOriginCoordX: 0, transOriginCoordY: 0, skewY: 0, skewX: 35}],
    [{height: 0.1, width: 44, top: 53.5, left:0},{height: 0.1, width: 44, top: 53.5, left: 132},{height: 26, width: 0.1, top: 7, left : 50*screenRatio},{height: 40, width: 0.1, top: 60, left : 44},{height: 40, width: 0.1, top: 60, left : 132}],
    [{height: 0.1, width: 44, top: 53.5, left:0},{height: 0.1, width: 44, top: 53.5, left: 132},{height: 93, width: 0.1, top: 7, left:44},{height: 93, width: 0.1, top: 7, left: 132}]
]
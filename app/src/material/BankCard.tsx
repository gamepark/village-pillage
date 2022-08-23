/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { Picture, PictureAttributes } from "@gamepark/react-components"
import Images from "../images/Images"

type Props={
    duel: boolean
} & PictureAttributes

export default function BankCard({duel, ...props} : Props) {
    // return <Picture src={Images.bankDuel} css={bankCss} {...props}/>
    return duel ? <Picture src={Images.bankDuel} css={bankCss} {...props}/> : <Picture src={Images.bank} css={bankCss} {...props}/> 
}

const bankHeight = 22
export const bankWidth = bankHeight * 327 / 500

const bankCss = css`
width: ${bankWidth}em;
height: ${bankHeight}em;
filter: drop-shadow(0 0 0.3em black);
border-radius: 1em;
`
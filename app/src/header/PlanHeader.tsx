/** @jsxImportSource @emotion/react */
import { Trans } from 'react-i18next'
import { PlayMoveButton, useLegalMoves } from '@gamepark/react-game'
import { isEndPlayerTurn, MaterialMove } from '@gamepark/rules-api'

export const PlanHeader = () => {
  const legalMoves = useLegalMoves<MaterialMove>()
  const pass = legalMoves.find(isEndPlayerTurn)
  if (pass) {
    return <Trans defaults="<0>End turn</0>">
      <PlayMoveButton move={pass}/>
    </Trans>
  }

  return <>Plan</>
}

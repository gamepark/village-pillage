import CardRules from '../CardRules'
import { PlayerId } from '../../VillagePillageOptions'
import { MaterialMove } from '@gamepark/rules-api'

export default class Doctor extends CardRules {
    canBuyRelic = true

  getAlternativeMoves(_player: PlayerId) : MaterialMove[] {
        const moves: MaterialMove[] = []
        //moves.push(gainTurnipsMove(_player.id, 2))
        // TODO exhaust opponent card

        return moves
    }
}
import CardRules from '../CardRules'
import { PlayerId } from '../../VillagePillageOptions'
import { MaterialMove } from '@gamepark/rules-api'

export default class Bard extends CardRules {
    canBuyRelic = true


  getAlternativeMoves(_player: PlayerId) : MaterialMove[] {
        const moves: MaterialMove[] = []
        //moves.push(gainTurnipsMove(player, 1))
        // TODO Draw first card

        return moves
    }
}
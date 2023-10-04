import CardRules from '../CardRules'
import { PlayerId } from '../../VillagePillageOptions'
import { MaterialMove } from '@gamepark/rules-api'

export default class Bard extends CardRules {
    canBuyRelic = true
    offsetRelicPrice = -2

  getAlternativeMoves(_player: PlayerId) : MaterialMove[] {
        // const moves: Move[] = []
        // if (_player.bank > 0) moves.push(bankTurnipsMove(_player.id, -_player.bank))
        //
        return []
    }
}
import Phase from '../Phase'
import { MaterialGame, MaterialItem, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { PlayerId } from '../VillagePillageOptions'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'

export default abstract class CardRules extends MaterialRulesPart<PlayerId, MaterialType, LocationType> {
    gain = 0
    gainInRefresh = 0
    opponentGain = 0
    stealValue = 0
    stealValueFromOpponentCard = 0
    bank = 0
    canBuyRelic = false
    priceToBuyCard = Infinity
    offsetRelicPrice = 0
    moves: MaterialMove[] = []

    constructor(game: MaterialGame) {
        super(game)
    }

    getGain(_opponentCard: MaterialItem) : number {
        if (Phase.RESOLVE) return this.gain
        else if (Phase.REFRESH) return this.gainInRefresh
        else return 0
    }

    getOpponentGain(_opponentCard: MaterialItem) : number {
        if (Phase.RESOLVE) return this.opponentGain
        else return 0
    }

    getSteal(_opponentCard: MaterialItem) : number {
        if (Phase.RESOLVE) return this.stealValue
        else return 0
    }

    getStealToOpponent(_opponentCard: MaterialItem) : number {
        if (Phase.RESOLVE) return this.stealValueFromOpponentCard
        else return 0
    }

    getBank(_opponentCard: MaterialItem) : number {
        if (Phase.RESOLVE) return this.bank
        else return 0
    }

    getAlternativeMoves(_player: PlayerId) : MaterialMove[] {
        if (Phase.RESOLVE) return this.moves
        else return []
    }
}
import { Material, MaterialGame, MaterialItem, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { PlayerId } from '../VillagePillageOptions'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { RuleId } from '../rules/RuleId'

export default abstract class CardRules extends MaterialRulesPart<PlayerId, MaterialType, LocationType> {
    gain = 0
    gainInRefresh = 0
    opponentGain = 0
    stealValue = 0
    stealValueFromOpponentCard = 0
    stealInBank = false
    bank = 0
    canBuyRelic = false
    priceToBuyCard = Infinity
    offsetRelicPrice = 0
    moves: MaterialMove[] = []

    constructor(game: MaterialGame) {
        super(game)
    }

    getGain(_opponentCard: MaterialItem) : number {
        return this.isRefresh? this.gainInRefresh: this.gain
    }

    getOpponentGain(_opponentCard: MaterialItem) : number {
        return this.isRefresh? 0: this.opponentGain
    }

    getSteal(_opponentCard: MaterialItem) : number {
        return this.isRefresh? 0: this.stealValue
    }

    getStealToOpponent(_opponentCard: MaterialItem) : number {
        return this.isRefresh? 0: this.stealValueFromOpponentCard
    }

    getBank(_opponentCard: MaterialItem) : number {
        return this.isRefresh? 0: this.bank
    }

    getAlternativeMoves(_player: PlayerId, _opponentCard: Material, _turnips: number) : MaterialMove[] {
        return this.isRefresh? []: this.moves
    }

    canBuyCard(_opponentCard: MaterialItem): boolean {
        return false
    }

    get isRefresh() {
        return this.game.rule?.id === RuleId.Refresh
    }

    isExhaustCard(_opponentCard: MaterialItem) {
        return false
    }

    isExhaustItself(_opponentCard: MaterialItem) {
        return false
    }

    isExchangeCards(_opponentCard: MaterialItem) {
        return false;
    }
}
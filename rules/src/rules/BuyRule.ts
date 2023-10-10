import { CustomMove, isCustomMoveType, isMoveItemType, isStartRule, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { getCardRules } from '../cards/getCardRules'
import { Memory } from './Memory'
import { CustomMoveType } from './CustomMoveType'
import { RuleId } from './RuleId'
import { Resolution } from './helper/Resolution'
import { PlayerState } from './helper/PlayerState'

export class BuyRule extends PlayerTurnRule {

  onRuleStart() {
    const playerState = this.playerState
    const choices = playerState.choices
    if (!choices.length) return this.goToNextPlayer()

    // In this case, player comes from Buy market card
    if (this.currentCard) {
      return this.afterCardPlayed()
    }

    if (choices.length === 1 && !this.currentCard) {
      return [this.rules().customMove(CustomMoveType.ChooseCard, choices[0])]
    }

    return []
  }

  getPlayerMoves(): MaterialMove<number, number, number>[] {
    const playerState = this.playerState
    const choices = playerState.choices

    if (choices.length > 1 && !this.currentCard) {
      return choices.map((index) => this.rules().customMove(CustomMoveType.ChooseCard, index))
    }

    return []
  }

  onCustomMove(move: CustomMove) {
    if (!isCustomMoveType(CustomMoveType.ChooseCard)(move)) return []
    this.memorize(Memory.CurrentCard, move.data)

    const cardMaterial = this.currentCard!
    const card = cardMaterial.getItem()!
    const rule = getCardRules(this.game, card.id)
    const resolution = new Resolution(this.game, card.location.id, this.player)
    if (rule.canBuyCard(resolution.opponentCard.getItem()!)) {
      return [this.rules().startRule(RuleId.BuyMarketCard)]
    }

    const moves: MaterialMove[] = this.obtainRelicIfEnoughTurnips(move.data)
    if (!moves.length) {
      // Not enough turnips
      const alternatives = rule.getAlternativeMoves(this.player, resolution.opponentCard, this.playerState.turnips)
      moves.push(...alternatives)
      if (alternatives.some(isStartRule)) {
        return moves
      }

      moves.push(...this.afterCardPlayed())
    }

    return moves
  }

  obtainRelicIfEnoughTurnips(index: number) {
    const cardMaterial = this.material(MaterialType.Card).index(index)
    const rule = getCardRules(this.game, cardMaterial.getItem()!.id)
    const playerState = this.playerState
    if (playerState.canBuyRelic(rule.offsetRelicPrice)) {
      return playerState.buyRelic()
    }

    return []
  }

  beforeItemMove(move: ItemMove) {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Relic)(move)) {
      const playerState = this.playerState
      moves.push(...playerState.getSpendTurnipsMoves(playerState.nextRelicPrice))
    }

    return moves
  }

  afterItemMove(move: ItemMove) {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Relic)(move)) {
      moves.push(...this.afterCardPlayed())
    }

    return moves
  }

  afterCardPlayed() {
    const playerState = this.playerState
    const choices = playerState.choices
    if (choices.length === 2) {
      if (this.remind(Memory.OtherCardPlayed)) {
        return this.goToNextPlayer()
      }

      this.memorize(Memory.OtherCardPlayed, true)
      this.memorize(Memory.CurrentCard, (index) => choices.find((i) => i !== index))
      return [this.rules().customMove(CustomMoveType.ChooseCard, this.currentCard?.getIndex())]
    }

    return this.goToNextPlayer()
  }

  goToNextPlayer()   {
    this.forget(Memory.CurrentCard)
    this.forget(Memory.OtherCardPlayed)
    this.memorize(Memory.DonePlayers, (players) => [...(players ?? []), this.player])
    // Victory condition
    return [this.rules().startRule(RuleId.SelectNextBuyPlayer)]
  }

  get currentCard() {
    const current = this.remind(Memory.CurrentCard)
    if (current === undefined) return undefined
    return this.material(MaterialType.Card).index(current)
  }

  get playerState() {
    return new PlayerState(this.game, this.player)
  }
}

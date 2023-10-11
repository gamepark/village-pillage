import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule, RuleMove, RuleStep } from '@gamepark/rules-api'
import { PlayerState } from './helper/PlayerState'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { Memory } from './Memory'
import { getCardRules } from '../cards/getCardRules'
import { RuleId } from './RuleId'

export class BuyMarketCard extends PlayerTurnRule {

  getPlayerMoves(): MaterialMove<number, number, number>[] {
    const playerState = this.playerState
    const cost = this.cost

    const moves: MaterialMove[] = []
    if (playerState.turnips >= cost) {
      moves.push(
        ...this.material(MaterialType.Card).location(LocationType.Market).moveItems({
          location: {
            type: LocationType.Hand,
            player: this.player,
          },
        }),
      )
    }
    return moves
  }

  beforeItemMove(move: ItemMove) {
    const moves: MaterialMove[] = []

    if (isMoveItemType(MaterialType.Card)(move) && move.position.location?.type === LocationType.Hand) {
      const item = this.card.getItem()!
      moves.push(...this.playerState.getSpendTurnipsMoves(getCardRules(this.game, item.id).priceToBuyCard))
    }

    return moves
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move) || move.position.location?.type !== LocationType.Hand) return []

    const marketDeck = this
      .material(MaterialType.Card)
      .location(LocationType.MarketDeck)

    const moves: MaterialMove[] = []
    if (marketDeck.length) {
      moves.push(
        marketDeck
          .sort((item) => -item.location.x!)
          .moveItem({
            location: {
              type: LocationType.Market,
            },
          })
      )
    }

    moves.push(this.rules().startRule(RuleId.Buy))
    return moves
  }

  get playerState() {
    return new PlayerState(this.game, this.player)
  }

  get cost() {
    const card = this.card
    return getCardRules(this.game, card.getItem()!.id).priceToBuyCard
  }

  get card() {
    const index = this.remind(Memory.CurrentCard)
    if (!index) {
      throw new Error('There is no active card for player')
    }

    return this.material(MaterialType.Card).index(index)
  }

  onRuleEnd() {
    const playerState = this.playerState
    const choices = playerState.choices
    if (choices.length === 2) {
      if (this.remind(Memory.OtherCardPlayed)) return []

      this.memorize(Memory.OtherCardPlayed, true)
      this.memorize(Memory.CurrentCard, (index) => choices.filter((i) => i !== index))
    }

    return []
  }
}
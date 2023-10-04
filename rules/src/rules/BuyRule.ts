import { CustomMove, isCustomMoveType, isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { PlayerId } from '../VillagePillageOptions'
import Side from './Side'
import CardType from '../CardType'
import { getCardRules } from '../cards/getCardRules'
import { Resolution } from './helper/Resolution'
import { Memory } from './Memory'
import { CustomMoveType } from './CustomMoveType'
import { Relic } from '../material/Relic'

export class BuyRule extends PlayerTurnRule {

  onRuleStart() {
    const choices = this.choices
    if (!choices.length) return this.goToRefreshMoves
    if (choices.length === 1) {
      this.memorize(Memory.CurrentCard, choices[0])
    }

    return []
  }

  getPlayerMoves(): MaterialMove<number, number, number>[] {
    const choices = this.choices
    if (choices.length > 1 && !this.currentCard) {
      return choices.map((index) => this.rules().customMove(CustomMoveType.ChooseCard, index))
    }

    const moves: MaterialMove[] = []
    const cardMaterial = this.currentCard!
    const rule = getCardRules(this.game, cardMaterial.getItem()!.id)
    const cost = this.relicPrice + rule.offsetRelicPrice
    if ((this.bankCount + this.stockCount) < cost) {
      // Not enough turnips
      const alternatives = rule.getAlternativeMoves(this.player)
      if (!alternatives.length) return this.afterCardPlayed()
      return alternatives
    } else {
      // Enough turnips for relic
      const relic = this.relics.maxBy((item) => item.id).getItem()
      moves.push(
        this
          .material(MaterialType.Relic)
          .location(LocationType.Bank)
          .id(!relic? Relic.Scepter: (relic.id + 1))
          .moveItem({ location: { type: LocationType.PlayerRelics, player: this.player }})
      )
    }
    return moves
  }

  get choices() {
    const leftResolution = this.getResolution(this.player, Side.LEFT)
    const rightResolution = this.getResolution(this.player, Side.RIGHT)
    if (leftResolution.cardType !== CardType.Merchant && rightResolution.cardType !== CardType.Merchant) return []
    const hasChoice = leftResolution.cardType === CardType.Merchant && rightResolution.cardType === CardType.Merchant
    if (hasChoice) {
      return [
        leftResolution.cardMaterial.getIndex(),
        rightResolution.cardMaterial.getIndex(),
      ]
    }

    return [(leftResolution.cardType === CardType.Merchant)? leftResolution.cardMaterial.getIndex(): rightResolution.cardMaterial.getIndex()]
  }

  get goToRefreshMoves() {
    // If it is the last player with market card, go to refresh phase
    // else go to next player (turn order must be kept in memory
    // End of resolution, go to refresh phase
    return []
  }

  onCustomMove(move: CustomMove) {
    if (!isCustomMoveType(CustomMoveType.ChooseCard)(move)) return []
    return []
  }

  beforeItemMove(move: ItemMove) {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.Relic)(move)) {
      moves.push(...this.getSpentTurnipsMoves(this.relicPrice))
      moves.push(...this.afterCardPlayed())
      // Victory condition
      if (this.relics.length === 2) moves.push(this.rules().endGame())
    }

    if (isMoveItemType(MaterialType.Card)(move) && move.position.location?.type !== LocationType.Hand) {
      const item = this.currentCard!.getItem()!
      moves.push(...this.getSpentTurnipsMoves(getCardRules(this.game, item.id).priceToBuyCard))
      moves.push(...this.afterCardPlayed())
    }

    return moves
  }

  afterCardPlayed() {
    const choices = this.choices
    if (choices.length === 2) {
      if (this.remind(Memory.OtherCardPlayed)) {
        return this.goToRefreshMoves
      }

      this.memorize(Memory.OtherCardPlayed, true)
      this.memorize(Memory.CurrentCard, (index) => this.choices.filter((i) => i !== index))
    }

    return []
  }

  getSpentTurnipsMoves(price: number) {
    const moves : MaterialMove[] = []
    const stockCost = Math.min(price, this.stockCount)
    if (stockCost) {
      moves.push(
        ...this.stock.moveItems({ location: { type: LocationType.PlayerTurnipStock }}, stockCost)
      )
    }

    const bankCost = price - stockCost
    if (bankCost) {
      moves.push(
        ...this.bank.limit(bankCost).moveItems({ location: { type: LocationType.PlayerTurnipStock }})
      )
    }

    return moves
  }

  getResolution(player: PlayerId, side: Side) {
    const item = this
      .material(MaterialType.Card)
      .location(LocationType.PlanedCard)
      .locationId(side)
      .player(player)
      .getItem()!
    return new Resolution(this.game, item.location.id)
  }

  get relics() {
    return this
      .material(MaterialType.Relic)
      .location(LocationType.PlayerRelics)
      .player(this.player)
  }

  get relicPrices() : number[] {
    return this.game.players.length === 2 ? [6,7,8] : [8,9,10]
  }

  get relicPrice() {
    const prices = this.relicPrices
    const playerRelics = this.relics
    return prices[playerRelics.length]
  }

  get stock() {
    return this
      .material(MaterialType.Turnip)
      .location(LocationType.PlayerTurnipStock)
      .player(this.player)
  }

  get stockCount() {
    const stock = this.stock
    return !stock.length ? 0 : (stock.getItem()!.quantity ?? 0)
  }

  get bank() {
    return this
      .material(MaterialType.Turnip)
      .location(LocationType.PlayerBankTurnips)
      .player(this.player)
  }

  get bankCount() {
    return this.bank.length
  }

  get currentCard() {
    const current = this.remind(Memory.CurrentCard)
    if (current === undefined) return undefined
    return this.material(MaterialType.Card).index(current)
  }

  onRuleEnd() {
    this.forget(Memory.CurrentCard)
    this.forget(Memory.OtherCardPlayed)
    return []
  }
}

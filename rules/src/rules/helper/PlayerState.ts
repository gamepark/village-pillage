import { MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { PlayerId } from '../../VillagePillageOptions'
import { MaterialType } from '../../material/MaterialType'
import { LocationType } from '../../material/LocationType'
import { BuyEffectFinder } from './BuyEffectFinder'

export class PlayerState extends MaterialRulesPart {
  constructor(game: MaterialGame, readonly player: PlayerId) {
    super(game)
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

  get nextRelicPrice() {
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

  get turnips() {
    return this.stockCount + this.bankCount
  }

  get stockCount() {
    const stock = this.stock.getItem()
    return stock?.quantity ?? 0
  }

  get bank() {
    return this
      .material(MaterialType.Turnip)
      .location(LocationType.PlayerBankTurnips)
      .player(this.player)
  }

  get bankCount() {
    const bank = this.bank.getItem()
    return bank?.quantity ?? 0
  }

  get choices() {
    const cardsWithBuyEffect = new BuyEffectFinder(this.game, this.player).cardsWithBuyEffect
    if (cardsWithBuyEffect.length === 0) return []
    const hasChoice = cardsWithBuyEffect.length === 2
    if (hasChoice) {
      return cardsWithBuyEffect.getIndexes()
    }

    return [cardsWithBuyEffect.getIndex()]
  }

  getSpendTurnipsMoves(price: number) {
    const moves : MaterialMove[] = []
    const stockCost = Math.min(price, this.stockCount)
    if (stockCost) {
      moves.push(
        ...this.stock.deleteItems(stockCost)
      )
    }

    const bankCost = price - stockCost
    if (bankCost) {
      moves.push(
        ...this.bank.deleteItems(bankCost)
      )
    }

    return moves
  }

}
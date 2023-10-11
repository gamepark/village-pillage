import { MaterialGame, MaterialItem, MaterialRulesPart } from '@gamepark/rules-api'
import { PlayerId } from '../../VillagePillageOptions'
import { MaterialType } from '../../material/MaterialType'
import { LocationType } from '../../material/LocationType'
import { getCardRules } from '../../cards/getCardRules'
import { Resolution } from './Resolution'
import { Memory } from '../Memory'
import { getCardColor } from '../../CardColor'
import Side from '../Side'

export class BuyEffectFinder extends MaterialRulesPart {

  constructor(game: MaterialGame, readonly player: PlayerId) {
    super(game)
  }

  get cardsWithBuyEffect() {
    const cardColor = this.cardColor
    const cards = this.material(MaterialType.Card)
      .location(LocationType.PlanedCard)
      .player(this.player)
      .filter((item) => !this.isTwoPlayerGame || item.location.id === Side.Left)
      .filter((item) => getCardColor(item.id) === cardColor)

    return cards
      .filter((item) => this.canActivateCard(item))
  }

  canActivateCard(item: MaterialItem) {
    const rule = getCardRules(this.game, item.id)
    if (rule.canBuyRelic && this.canBuyRelic) {
      return true
    }

    const resolution = new Resolution(this.game, item.location.id, item.location.player!)
    if (rule.canBuyCard(resolution.opponentCard.getItem()!)) {
      return this.turnips >= rule.priceToBuyCard;
    }
    return !!rule
      .getAlternativeMoves(this.player, resolution.opponentCard, this.turnips)
      .length
  }

  get canBuyRelic() {
    return this.turnips >= this.nextRelicPrice
  }

  get turnips() {
    return this.stock + this.bank
  }

  get stock() {
    const stock = this
      .material(MaterialType.Turnip)
      .location(LocationType.PlayerTurnipStock)
      .player(this.player)
      .getItem()
    return stock?.quantity ?? 0
  }

  get bank() {
    const bank = this
      .material(MaterialType.Turnip)
      .location(LocationType.PlayerBankTurnips)
      .player(this.player)
      .getItem()
    return bank?.quantity ?? 0
  }

  get relicPrices() : number[] {
    return this.game.players.length === 2 ? [6,7,8] : [8,9,10]
  }

  get nextRelicPrice() {
    const relics =  this
      .material(MaterialType.Relic)
      .location(LocationType.PlayerRelics)
      .player(this.player)

    const prices = this.relicPrices
    return prices[relics.length]
  }

  get cardColor() {
    return this.remind(Memory.CardColor)
  }

  get isTwoPlayerGame() {
    return this.game.players.length === 2
  }
}
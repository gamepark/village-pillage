import { CustomMove, isCustomMoveType, MaterialRulesPart } from '@gamepark/rules-api'
import { RuleId } from './RuleId'
import { PlayerId } from '../VillagePillageOptions'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { Memory } from './Memory'
import { CustomMoveType } from './CustomMoveType'
import groupBy from 'lodash/groupBy'
import isEmpty from 'lodash/isEmpty'
import { BuyEffectFinder } from './helper/BuyEffectFinder'
import { cardColors } from '../CardColor'

export class SelectNextBuyPlayerRule extends MaterialRulesPart {
  onRuleStart() {
    const remainingPlayers = this.game.players
      .filter((player) => new BuyEffectFinder(this.game, player).cardsWithBuyEffect.length)
      .filter((player) => !this.playerDone.includes(player))

    const players = groupBy(remainingPlayers, (player) => this.getTurnips(player))
    if (isEmpty(players)) return this.goToNextPlayer()

    const first = Math.min(...Object.keys(players).map((p) => +p))
    if (players[first].length === 1) {
      return [this.rules().startPlayerTurn(RuleId.Buy, players[first][0])]
    }

    return [this.rules().customMove(CustomMoveType.Chicken, players[first])]
  }

  onCustomMove(move: CustomMove) {
    if (!isCustomMoveType(CustomMoveType.Chicken)(move)) return []
    return [this.rules().startPlayerTurn(RuleId.Buy, move.data)]
  }

  getTurnips(player: PlayerId) {
    return this.getStockSize(player) + this.getBankSize(player)
  }

  getStockSize(player: PlayerId) {
    const stock = this
      .material(MaterialType.Turnip)
      .location(LocationType.PlayerTurnipStock)
      .player(player)
    return stock.getItem()?.quantity ?? 0
  }

  getBankSize(player: PlayerId) {
    const bank = this
      .material(MaterialType.Turnip)
      .location(LocationType.PlayerBankTurnips)
      .player(player)
    return bank.getItem()?.quantity ?? 0
  }

  goToNextPlayer(player?: PlayerId) {
    const nextType = cardColors[cardColors.indexOf(this.currentType) + 1]
    if (!nextType) {
      if (player && this.getRelics(player).length === 3) return [this.rules().endGame()]
      return [this.rules().startRule(RuleId.Refresh)]
    }

    this.memorize(Memory.CardColor, nextType)
    return [this.rules().startRule(RuleId.Gain)]
  }

  getRelics(player: PlayerId) {
    return this
      .material(MaterialType.Relic)
      .location(LocationType.PlayerRelics)
      .player(player)
  }

  get currentType() {
    return this.remind(Memory.CardColor)
  }

  get playerDone() {
    return this.remind(Memory.DonePlayers) ?? []
  }
}
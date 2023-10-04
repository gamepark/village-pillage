import { Material, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { RuleId } from './RuleId'
import { Resolution } from './helper/Resolution'
import CardType, { getCardType } from '../CardType'
import { Memory } from './Memory'
import { getCardRules } from '../cards/getCardRules'
import { PlayerId } from '../VillagePillageOptions'
import Side from './Side'

export class StealRule extends MaterialRulesPart {

  onRuleStart(): MaterialMove<number, number, number>[] {
    const moves = this.getSteals()
    moves.push(this.rules().startRule(RuleId.Bank))
    return moves
  }

  getSteals(): MaterialMove[] {
    const players = this.game.players
    const moves: MaterialMove[] = []
    for (let victimIndex = 0; victimIndex < players.length; victimIndex++) {
      const victim = players[victimIndex]
      const stock = this.getStock(victim)
      const stockSize = !stock.length ? 0 : (stock.getItem()!.quantity ?? 0)
        const bank = this.getBank(victim)
        if (!bank.length && !stockSize) continue

      const leftResolution = this.getResolution(victim, Side.LEFT)
      const rightResolution = this.getResolution(victim, Side.RIGHT)

      const { left, right } = this.computeSteals(leftResolution, rightResolution, stockSize)

      // TODO: moves.push(this.material(MaterialType.Chicken).moveItem(chicken = 1? { rotation: { y: 1 } }: {}
      moves.push(...this.getTurnipMoves(stock, stockSize, left, leftResolution.opponent))
      moves.push(...this.getTurnipMoves(stock, stockSize, right, rightResolution.opponent))
    }

    return moves
  }

  getTurnipMoves(stock: Material, stockSize: number, count: number, player: PlayerId) {
    if (!count) return []
    return stock.moveItems({
      location: {
        type: LocationType.PlayerTurnipStock,
        player,
      },
    }, Math.min(count, stockSize))
  }

  getStealsCount(resolution: Resolution) {
    if (getCardType(resolution.opponentCard.id) !== this.cardType) return 0

    return getCardRules(this.game, resolution.opponentCard.id).getSteal(resolution.card)
      + getCardRules(this.game, resolution.card.id).getStealToOpponent(resolution.opponentCard)
  }

  getStock(player: PlayerId) {
    return this
      .material(MaterialType.Turnip)
      .location(LocationType.PlayerTurnipStock)
      .player(player)
  }

  getBank(player: PlayerId) {
    return this
      .material(MaterialType.Turnip)
      .location(LocationType.PlayerBankTurnips)
      .player(player)
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

  get cardType() {
    return this.remind<CardType>(Memory.CardType)
  }

  computeSteals(leftResolution: Resolution, rightResolution: Resolution, stockSize: number) {
    let left = this.getStealsCount(leftResolution)
    let right = this.getStealsCount(rightResolution)

    let chicken: PlayerId | undefined = undefined
    if (left === 0 || right === 0 || left+right <= stockSize) return { left, right }
    if (stockSize % 2 !== 1) return { left: stockSize / 2, right: stockSize / 2 }


    if (left > right) {
      return {
        left: Math.ceil(stockSize / 2),
        right: Math.floor(stockSize / 2)
      }
    }

    if (left < right) {
      return {
        left: Math.floor(stockSize / 2),
        right: Math.ceil(stockSize / 2)
      }
    }

    if (Math.random() < 0.5) {
      left = Math.ceil(stockSize / 2)
      right = Math.floor(stockSize / 2)
      chicken = 0
    } else {
      left = Math.floor(stockSize / 2)
      right = Math.ceil(stockSize / 2)
      chicken = 1
    }

    return {
      left,
      right,
      chicken,
    }
  }
}

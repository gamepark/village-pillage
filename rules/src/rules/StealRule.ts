import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { Resolution } from './helper/Resolution'
import CardColor from '../CardColor'
import { Memory } from './Memory'
import { getCardRules } from '../cards/getCardRules'
import { PlayerId } from '../VillagePillageOptions'
import Side from './Side'
import { RuleId } from './RuleId'
import { PlayerState } from './helper/PlayerState'

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
      const victimState = new PlayerState(this.game, victim)
      if (!victimState.turnips) continue
      const stockCount = victimState.stockCount

      const leftResolution = this.getResolution(victim, Side.Left)
      const rightResolution = this.getResolution(victim, Side.Right)

      const { left, right } = this.computeSteals(leftResolution, rightResolution, stockCount)

      // TODO: moves.push(this.material(MaterialType.Chicken).moveItem(chicken = 1? { rotation: { y: 1 } }: {}
      moves.push(...this.getTurnipMoves(victimState, left, leftResolution))
      moves.push(...this.getTurnipMoves(victimState, right, rightResolution))
    }

    return moves
  }

  getTurnipMoves(victimState: PlayerState, count: number, resolution: Resolution) {
    if (!count) return []
    return victimState.stock.moveItems({
      location: {
        type: LocationType.PlayerTurnipStock,
        player: resolution.opponent,
      },
    }, Math.min(count, victimState.stockCount))
  }

  getStealsCount(resolution: Resolution) {
    const item = resolution.opponentCard.getItem()!
    if (resolution.opponentCardColor !== this.cardColor) return 0

    return getCardRules(this.game, item.id).getSteal(resolution.card)
      + getCardRules(this.game, resolution.card.id).getStealToOpponent(item)
  }

  getResolution(player: PlayerId, side: Side) {
    const item = this
        .material(MaterialType.Card)
        .location(LocationType.PlanedCard)
        .locationId(side)
        .player(player)
        .getItem()!
    return new Resolution(this.game, item.location.id, player)
  }

  get cardColor() {
    return this.remind<CardColor>(Memory.CardColor)
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

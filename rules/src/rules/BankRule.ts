import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { getCardRules } from '../cards/getCardRules'
import { Resolution } from './helper/Resolution'
import { Memory } from './Memory'
import CardColor from '../CardColor'
import { PlayerId } from '../VillagePillageOptions'
import Side from './Side'
import { RuleId } from './RuleId'
import { PlayerState } from './helper/PlayerState'

export class BankRule extends MaterialRulesPart {
  onRuleStart(): MaterialMove<number, number, number>[] {
    const moves: MaterialMove[] = this.game.players.flatMap((item) => this.getPlayerTurnipsToBankMoves(item))
    moves.push(this.rules().startRule(RuleId.Exhaust))
    return moves
  }

  getPlayerTurnipsToBankMoves(player: PlayerId): MaterialMove[] {
    const playerState = new PlayerState(this.game, player)
    const bankSize = this.bankSize
    if (playerState.bankCount >= bankSize || !playerState.stockCount) return []

    let maxTurnipsToBank = Math.min(this.bankSize - playerState.bankCount, playerState.stockCount)
    if (!maxTurnipsToBank) return []
    const moves: MaterialMove[] = []
    const leftResolution = this.getResolution(player, Side.Left)

    if (leftResolution.cardColor === this.cardColor) {
      maxTurnipsToBank = this.getBankMovesForResolution(leftResolution, playerState, maxTurnipsToBank, moves)
    }

    if (this.isTwoPlayerGame) return moves

    const rightResolution= this.getResolution(player, Side.Right)
    if (maxTurnipsToBank && rightResolution.cardColor === this.cardColor) {
      this.getBankMovesForResolution(rightResolution, playerState, maxTurnipsToBank, moves)
    }

    return moves
  }

  getBankMovesForResolution(resolution: Resolution, playerState: PlayerState, maxTurnipsToBank: number, moves: MaterialMove[]) {


    const item = resolution.opponentCard.getItem()!
    const stock = playerState.stock
    const bankedTurnips = Math.min(
      getCardRules(this.game, resolution.card.id).getBank(item),
      maxTurnipsToBank
    )

    if (!bankedTurnips) return maxTurnipsToBank
    moves.push(
      ...stock.moveItems({ location: { type: LocationType.PlayerBankTurnips, player: resolution.player }}, bankedTurnips)
    )
    return maxTurnipsToBank - bankedTurnips
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

  get bankSize() {
    return this.game.players.length === 2 ? 4 : 5
  }

  get cardColor() {
    return this.remind<CardColor>(Memory.CardColor)
  }

  get isTwoPlayerGame() {
    return this.game.players.length === 2
  }
}
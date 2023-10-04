import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { RuleId } from './RuleId'
import { getCardRules } from '../cards/getCardRules'
import { Resolution } from './helper/Resolution'
import { Memory } from './Memory'
import CardType, { getCardType } from '../CardType'
import { PlayerId } from '../VillagePillageOptions'
import Side from './Side'

export class BankRule extends MaterialRulesPart {
  onRuleStart(): MaterialMove<number, number, number>[] {
    const moves: MaterialMove[] = this.game.players.flatMap((item) => this.getPlayerTurnipsToBankMoves(item))
    moves.push(this.rules().startRule(RuleId.Buy))
    return moves
  }

  getPlayerTurnipsToBankMoves(player: PlayerId): MaterialMove[] {
    const bankSize = this.bankSize
    const bank = this.getBank(player)
    const stock = this.getStock(player)
    const stockSize = !stock.length ? 0 : (stock.getItem()!.quantity ?? 0)
    if (bank.length >= bankSize || !stockSize) return []

    const moves: MaterialMove[] = []
    let bankable = Math.min(this.bankSize - bank.length, stockSize)
    const leftResolution = this.getResolution(player, Side.LEFT)
    const rightResolution= this.getResolution(player, Side.RIGHT)

    if (getCardType(leftResolution.opponentCard.id) === this.cardType) {
      const leftBank = Math.min(
        getCardRules(this.game, leftResolution.card.id).getBank(leftResolution.opponentCard),
        bankable
      )

      if (!leftBank) return moves
      moves.push(
        ...stock.moveItems({ location: { type: LocationType.PlayerBankTurnips, player }}, leftBank)
      )
      bankable -= leftBank
      if (!bankable) return moves;
    }

    if (getCardType(rightResolution.opponentCard.id) === this.cardType) {

      const rightBank = Math.min(
        getCardRules(this.game, rightResolution.card.id).getBank(rightResolution.opponentCard),
        bankable
      )

      if (!rightBank) return moves
      moves.push(
        ...stock.moveItems({ location: { type: LocationType.PlayerBankTurnips, player }}, rightBank)
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

  get bankSize() {
    return this.game.players.length === 2 ? 4 : 5
  }

  get cardType() {
    return this.remind<CardType>(Memory.CardType)
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
}
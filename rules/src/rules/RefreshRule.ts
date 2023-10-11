import { MaterialItem, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { RuleId } from './RuleId'
import { Memory } from './Memory'
import { PlayerId } from '../VillagePillageOptions'
import Side from './Side'
import { getCardRules } from '../cards/getCardRules'
import { Resolution } from './helper/Resolution'
import { Gain } from './helper/Gain'

export class RefreshRule extends MaterialRulesPart {
  onRuleStart() {
    const moves: MaterialMove[] = []

    moves.push(...this.gains)
    moves.push(...this.exchanges)
    moves.push(...this.retrieveExhaustedCards)
    moves.push(...this.refreshCards)
    moves.push(...this.moveTwoPlayerCentralCards)

    this.game.players.forEach((player) => this.forget(Memory.ExhaustedSides, player))
    this.forget(Memory.CardColor)
    moves.push(this.rules().startSimultaneousRule(RuleId.Plan, this.game.players))
    return moves
  }

  get moveTwoPlayerCentralCards() {
    if (!this.isTwoPlayerGame) return []

    return this.material(MaterialType.Card)
      .location(LocationType.PlanedCard)
      .filter((item) => item.location.id === Side.Right)
      .moveItems((item) => ({
        location: {
          ...item.location,
          id: Side.Left,
        },
      }))
  }

  get gains() {
    return this.plannedCards
      .getItems()
      .flatMap((item) => new Gain(this.game, item).turnipsMoves)
  }

  get refreshCards() {
    return this.plannedCards
      .moveItems((item) => {
        const player = item.location.player!
        return ({
          location: {
            type: this.isExhausted(player, item.location.id) ? LocationType.ExhaustCard : LocationType.Hand,
            player,
          },
        })
      })
  }

  get retrieveExhaustedCards() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.ExhaustCard)
      .moveItems((item) => ({
        location: {
          type: LocationType.Hand,
          player: item.location.player,
        },
      }))
  }

  get exchanges() {
    return this.plannedCards
      .getItems()
      .flatMap((item) => this.getExchange(item))
  }

  getExchange(item: MaterialItem) {
    const resolution = new Resolution(this.game, item.location.id, item.location.player!)
    const opponentItem = resolution.opponentCard.getItem()!
    if (!getCardRules(this.game, item.id).isExchangeCards(opponentItem)) return []
    const opponentLocation = opponentItem.location
    return [
      resolution.cardMaterial.moveItem({ location: opponentLocation }),
      resolution.opponentCard.moveItem({ location: item.location }),
    ]
  }

  get isTwoPlayerGame() {
    return this.game.players.length === 2
  }

  isExhausted(player: PlayerId, side: Side) {
    return (this.remind(Memory.ExhaustedSides, player) ?? []).includes(side)
  }

  get plannedCards() {
    return this.material(MaterialType.Card)
      .location(LocationType.PlanedCard)
      .filter((item) => !this.isTwoPlayerGame || item.location.id === Side.Left)
  }
}
import { Material, MaterialGame, MaterialItem, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { PlayerId } from '../../VillagePillageOptions'
import Side from '../Side'
import { MaterialType } from '../../material/MaterialType'
import { LocationType } from '../../material/LocationType'
import CardType, { getCardType } from '../../CardType'

export class Resolution extends PlayerTurnRule {
  public opponent: PlayerId
  public opponentCard: MaterialItem
  public opponentCardType: CardType

  public card: MaterialItem
  public cardType: CardType
  public cardMaterial: Material

  constructor(game: MaterialGame, side: Side) {
    super(game)
    this.cardMaterial = this
      .material(MaterialType.Card)
      .location(LocationType.PlanedCard)
      .locationId(side)
      .player(this.player)
    this.card = this.cardMaterial.getItem()!
    this.cardType = getCardType(this.card.id)

    this.opponent = side == Side.LEFT? this.nextPlayer: this.previousPlayer
    this.opponentCard = this
      .material(MaterialType.Card)
      .location(LocationType.PlanedCard)
      .locationId(side === Side.LEFT? Side.RIGHT: Side.LEFT)
      .player(this.opponent).getItem()!
    this.opponentCardType = getCardType(this.opponentCard.id)

  }

  getPlayerMoves(): MaterialMove<number, number, number>[] {
    return []
  }

  get previousPlayer(): PlayerId {
    const players = this.game.players
    const index = players.indexOf(this.player)
    const length = players.length
    return players[(index + length - 1) % length]
  }


}
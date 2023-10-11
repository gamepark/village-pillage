import { Material, MaterialGame, MaterialItem, MaterialRulesPart } from '@gamepark/rules-api'
import { PlayerId } from '../../VillagePillageOptions'
import Side from '../Side'
import { MaterialType } from '../../material/MaterialType'
import { LocationType } from '../../material/LocationType'
import { CardColor, getCardColor } from '../../material/Card'

export class Resolution extends MaterialRulesPart {
  public opponent: PlayerId
  public opponentCard: Material
  public opponentCardColor: CardColor

  public card: MaterialItem
  public cardColor: CardColor
  public cardMaterial: Material

  constructor(game: MaterialGame, side: Side, readonly player: PlayerId) {
    super(game)
    this.cardMaterial = this
      .material(MaterialType.Card)
      .location(LocationType.PlanedCard)
      .locationId(side)
      .player(this.player)
    this.card = this.cardMaterial.getItem()!
    this.cardColor = getCardColor(this.card.id)

    if (this.isTwoPlayerGame) {
      this.opponent = this.nextPlayer
    } else {
      this.opponent = side == Side.Left? this.nextPlayer: this.previousPlayer
    }

    const opponentSide = this.isTwoPlayerGame? side: (side === Side.Left? Side.Right: Side.Left)
    this.opponentCard = this
      .material(MaterialType.Card)
      .location(LocationType.PlanedCard)
      .locationId(opponentSide)
      .player(this.opponent)
    this.opponentCardColor = getCardColor(this.opponentCard.getItem()!.id)
  }

  get isTwoPlayerGame() {
    return this.game.players.length === 2
  }

  get previousPlayer(): PlayerId {
    const players = this.game.players
    const index = players.indexOf(this.player)
    const length = players.length
    return players[(index + length - 1) % length]
  }

  get nextPlayer(): PlayerId {
    return this.game.players[(this.game.players.indexOf(this.player) + 1) % this.game.players.length]
  }
}
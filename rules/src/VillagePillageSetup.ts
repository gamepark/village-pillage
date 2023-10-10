import { MaterialGameSetup, RuleStep } from '@gamepark/rules-api'
import { PlayerId, VillagePillageOptions } from './VillagePillageOptions'
import { MaterialType } from './material/MaterialType'
import { LocationType } from './material/LocationType'
import { locationsStrategies } from './configuration/LocationStrategies'
import { RuleId } from './rules/RuleId'
import { marketCards, startingCards } from './material/Card'
import shuffle from 'lodash/shuffle'

export class VillagePillageSetup extends MaterialGameSetup<PlayerId, MaterialType, LocationType, VillagePillageOptions> {

  setupMaterial(options: VillagePillageOptions) {
    this.setupPlayers(options)
    this.setupMarket(options)
  }

  setupPlayers(options: VillagePillageOptions) {
    for (let index = 0; index < options.players.length; index++) {
      const playerId = index + 1
      this.setupPlayer(playerId)
    }
  }

  setupPlayer(player: PlayerId) {
    this.material(MaterialType.Card).createItems(startingCards.map((id) => ({ id, location: { type: LocationType.Hand, player } })))
    this.material(MaterialType.Turnip).createItem({ quantity: 1, location: { type: LocationType.PlayerTurnipStock, player }})
    this.material(MaterialType.Turnip).createItem({ quantity: 1, location: { type: LocationType.PlayerBankTurnips, player }})
  }

  setupMarket(_options: VillagePillageOptions) {
    const deck = shuffle(marketCards)
    const startingMarket = deck.splice(0, 4)

    this
      .material(MaterialType.Card)
      .createItems(startingMarket.map((id) => ({ id, location: { type: LocationType.Market }})))

    this.material(MaterialType.Card)
      .createItems(deck.map((id) => ({ id, location: { type: LocationType.MarketDeck }})))
  }

  start(_options: VillagePillageOptions): RuleStep<PlayerId> {
    return { id: RuleId.Plan, players: this.players }
  }

  locationsStrategies = locationsStrategies
}
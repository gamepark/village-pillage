import { MaterialContext, RoundTokenDescription } from '@gamepark/react-game'
import { Relic } from '@gamepark/village-pillage/material/Relic'
import { relicStockLocation } from '../locator/RelicStockLocator'
import { RelicRules } from './rules/RelicRules'
import Scepter from '../images/septer.jpg'
import Throne from '../images/trone.jpg'
import Crown from '../images/couronne.jpg'

export class RelicDescription extends RoundTokenDescription {
  diameter = 2.7

  images = {
    [Relic.Scepter]: Scepter,
    [Relic.Throne]: Throne,
    [Relic.Crown]: Crown,
  }

  rules = RelicRules
  getStaticItems({ rules: { players } }: MaterialContext) {
    return [
      { id: Relic.Scepter, quantity: players.length, location: relicStockLocation },
      { id: Relic.Crown, quantity: players.length, location: relicStockLocation },
      { id: Relic.Throne, quantity: players.length, location: relicStockLocation },
    ]
  }

  stockLocation = relicStockLocation
}

export const relicDescription = new RelicDescription()
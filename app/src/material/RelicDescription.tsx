import { MaterialContext, RoundTokenDescription } from '@gamepark/react-game'
import { Relic } from '@gamepark/village-pillage/material/Relic'
import Images from '../images/Images'
import { relicStockLocation } from '../locator/RelicStockLocator'
import { RelicRules } from './rules/RelicRules'

export class RelicDescription extends RoundTokenDescription {
  diameter = 2.7

  images = {
    [Relic.Scepter]: Images.Scepter,
    [Relic.Throne]: Images.Throne,
    [Relic.Crown]: Images.Crown,
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
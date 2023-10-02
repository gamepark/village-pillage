import App from './App'
import translations from './translations.json'
import ReactDOM from 'react-dom'
import { addStylesheetUrl, GameProvider, MaterialGameAnimations, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import { VillagePillageRules } from '@gamepark/village-pillage/VillagePillageRules'
import { VillagePillageOptionsSpec } from '@gamepark/village-pillage/VillagePillageOptions'
import { VillagePillageSetup } from '@gamepark/village-pillage/VillagePillageSetup'
import { material } from './material/Material'
import { Locators } from './locator/Locators'

setupTranslation(translations, { debug: false })
addStylesheetUrl('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap')

ReactDOM.render(
  <StrictMode>
    <GameProvider game="village-pillage" GameSetup={VillagePillageSetup} Rules={VillagePillageRules} optionsSpec={VillagePillageOptionsSpec}
                  material={material} locators={Locators} animations={new MaterialGameAnimations()}>
      <App/>
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
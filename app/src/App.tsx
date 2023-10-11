/** @jsxImportSource @emotion/react */
import { FailuresDialog, FullscreenDialog, LoadingScreen, MaterialHeader, MaterialImageLoader, Menu, useGame } from '@gamepark/react-game'
import { FC, useEffect, useState } from 'react'
import { RuleId } from '@gamepark/village-pillage/rules/RuleId'
import { GameDisplay } from './GameDisplay'
import { MaterialGame } from "@gamepark/rules-api"
import { PlanHeader } from './header/PlanHeader'
import { RevealHeader } from './header/RevealHeader'
import { GainHeader } from './header/GainHeader'
import { StealHeader } from './header/StealHeader'
import { BankHeader } from './header/BankHeader'
import { BuyHeader } from './header/BuyHeader'
import { RefreshHeader } from './header/RefreshHeader'
import { BuyMarketCardHeader } from './header/BuyMarketCardHeader'

export default function App() {
  const game = useGame<MaterialGame>()
  const [imagesLoading, setImagesLoading] = useState(true)
  const [isJustDisplayed, setJustDisplayed] = useState(true)
  useEffect(() => {
    setTimeout(() => setJustDisplayed(false), 2000)
  }, [])
  const loading = !game || imagesLoading || isJustDisplayed
  return (
    <>
      <GameDisplay/>
      <LoadingScreen display={loading} author="Someone" artist="Somebody" publisher="Nobody" developer="You"/>
      <MaterialHeader rulesStepsHeaders={RulesHeaders} loading={loading}/>
      <MaterialImageLoader onImagesLoad={() => setImagesLoading(false)}/>
      <Menu/>
      <FailuresDialog/>
      <FullscreenDialog/>
    </>
  )
}

const RulesHeaders: Partial<Record<RuleId, FC>> = {
  [RuleId.Plan]: PlanHeader,
  [RuleId.Reveal]: RevealHeader,
  [RuleId.Gain]: GainHeader,
  [RuleId.Steal]: StealHeader,
  [RuleId.Bank]: BankHeader,
  [RuleId.Buy]: BuyHeader,
  [RuleId.Refresh]: RefreshHeader,
  [RuleId.BuyMarketCard]: BuyMarketCardHeader,
}
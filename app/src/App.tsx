/** @jsxImportSource @emotion/react */
import GameView from '@gamepark/village-pillage/GameView'
import { FailuresDialog, FullscreenDialog, Menu, useGame, LoadingScreen } from '@gamepark/react-game'
import { FC, useEffect, useState } from 'react'
import { RuleId } from '@gamepark/village-pillage/rules/RuleId'
import { MaterialHeader, MaterialImageLoader } from '@gamepark/react-game'
import { GameDisplay } from './GameDisplay'

export default function App() {
  const game = useGame<GameView>()
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
      <MaterialHeader GameOver={() => <p>GameOver</p>} rulesStepsHeaders={RulesHeaders} loading={loading}/>
      <MaterialImageLoader onImagesLoad={() => setImagesLoading(false)}/>
      <Menu/>
      <FailuresDialog/>
      <FullscreenDialog/>
    </>
  )
}

const RulesHeaders: Record<RuleId, FC> = {
  [RuleId.Plan]: () => <>Start</>
}
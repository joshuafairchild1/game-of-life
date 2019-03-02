import * as React from 'react'
import CanvasGrid from './CanvasGrid'
import ControlPanel from './ControlPanel'
import CanvasConfig from './model/CanvasConfig'
import useGame from './hook/useGame'
import Pattern from '../game/Pattern'
import KeyDownListener from './KeyDownListener'
import PatternSavedNotification from './PatternSavedNotification'
import PatternStorage from '../PatternStorage'
import useAppState from './state/useAppState'
import useGlobalHotKeys from './hook/useGlobalHotKeys'

import { Rules } from '../Types'
import { useCallback, useEffect, useRef } from 'react'

type Props = {
  rules: Rules
  presetPatterns: Pattern[]
  configuration: CanvasConfig
  interval: number
  storage: PatternStorage
}

const App: React.FC<Props> = props => {
  const state = useAppState()
  const setRecentSavedPattern = state.recentlySavedPattern.set
  const recentSavedPattern = state.recentlySavedPattern.get()
  const color = state.color.get()
  const cellCount = state.cellCount.get()
  const game = useGame(props.rules)
  const keyHandlers = useGlobalHotKeys(game)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const patternPickerOpen = state.patternPickerOpen.get()
  const saveModalOpen = state.showSavePatternModal.get()
  const focusContainer = useCallback(() => {
    if (!patternPickerOpen && !saveModalOpen) {
      containerRef.current && containerRef.current.focus()
    }
  }, [ patternPickerOpen, saveModalOpen ])
  useEffect(focusContainer)
  return (
    <KeyDownListener
      className="app-container"
      refAccess={containerRef}
      handlers={state.showSavePatternModal.get() ? [] : keyHandlers}>
      <ControlPanel
        presetPatterns={props.presetPatterns}
        storage={props.storage}
        game={game}/>
      <CanvasGrid
        configuration={{ ...props.configuration, color, cellCount }}
        grid={game.current}
        onCellClick={game.cellClicked}/>
      <PatternSavedNotification
        hide={() => {
          state.showPatternSaveNotification.set(false)
          setRecentSavedPattern(null)
        }}
        patternName={recentSavedPattern && recentSavedPattern.name}/>
    </KeyDownListener>
  )
}

export default App
import * as React from 'react'
import CanvasGrid from './CanvasGrid'
import ControlPanel from './ControlPanel'
import CanvasConfig from '../model/CanvasConfig'
import useGame from './hook/useGame'
import Pattern from '../game/Pattern'
import KeyDownListener from './KeyDownListener'
import PatternSavedNotification from './PatternSavedNotification'
import PatternStorage from '../PatternStorage'
import useAppState from '../state/useAppState'
import useGlobalHotKeys from './hook/useGlobalHotKeys'
import useAppContainerFocus from './hook/useAppContainerFocus'
import { Rules } from '../Types'

type Props = {
  rules: Rules
  presetPatterns: Pattern[]
  configuration: CanvasConfig
  interval: number
  storage: PatternStorage
}

const App: React.FC<Props> = props => {
  const state = useAppState()
  const color = state.color.get()
  const cellCount = state.cellCount.get()
  const game = useGame(props.rules)
  const keyHandlers = useGlobalHotKeys(game)
  return (
    <KeyDownListener
      className="app-container"
      refAccess={useAppContainerFocus()}
      handlers={state.showSavePatternModal.get() ? [] : keyHandlers}>
      <ControlPanel
        presetPatterns={props.presetPatterns}
        storage={props.storage}
        game={game}/>
      <CanvasGrid
        configuration={{ ...props.configuration, color, cellCount }}
        grid={game.current}
        onCellClick={game.cellClicked}/>
      <PatternSavedNotification/>
    </KeyDownListener>
  )
}

export default App
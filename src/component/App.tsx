import * as React from 'react'
import { useState } from 'react'
import CanvasGrid from './CanvasGrid'
import ControlPanel from './ControlPanel'
import CanvasConfig from './model/CanvasConfig'
import useGame from './hook/useGame'
import useDynamicConfigurations from './hook/useDynamicConfigurations'
import Pattern from '../game/Pattern'
import KeyDownListener from './KeyDownListener'
import saveKeyHandler from './saveKeyHandler'
import usePatterns from './hook/usePatterns'
import PatternSavedNotification from './PatternSavedNotification'

import { Rules } from '../Types'

const SPACEBAR_KEY_NAME = ' '

type Props = {
  rules: Rules
  presetPatterns: Pattern[]
  initialPattern: Pattern
  configuration: CanvasConfig
  interval: number
  persistPattern: (pattern: Pattern) => void
}

const App: React.FC<Props> = props => {
  const { configuration, rules } = props
  const {
    cellCount, renderInterval, pattern, color, ...dynamics
  } = useDynamicConfigurations({
    lineSeparation: configuration.lineSeparation,
    cellCount: configuration.cellCount,
    canvasLength: configuration.canvasLength,
    renderInterval: props.interval,
    pattern: props.initialPattern,
    color: configuration.color
  })
  const [ savePatternModalOpen, setSavePatternModalOpen ] = useState(false)
  const setPatternModalOpen = (isOpen: boolean) => {
    if (isOpen) {
      game.pause()
    }
    setSavePatternModalOpen(isOpen)
  }
  const [ recentlySavedPattern, setRecentlySavedPattern ]
    = useState<Pattern | null>(null)
  const [ showPatternSaveNotification, setShowPatternSaveNotification ]
    = useState(false)
  const game = useGame({ cellCount, renderInterval, pattern, rules })
  const [ patterns, addPattern ] = usePatterns(props.presetPatterns)
  const saveGridAsPattern = (name: string) => {
    const newPattern = game.current.toPattern(name)
    props.persistPattern(newPattern)
    addPattern(newPattern)
    setRecentlySavedPattern(newPattern)
    setShowPatternSaveNotification(true)
  }
  const keyDownHandlers = [ {
    keyName: 's',
    onKeyDown: saveKeyHandler(() => setPatternModalOpen(true))
  }, {
    keyName: SPACEBAR_KEY_NAME, onKeyDown: game.togglePlaying
  }]
  return (
    <KeyDownListener
      className="app-container"
      handlers={savePatternModalOpen ? [] : keyDownHandlers}>
      <ControlPanel
        cellCount={cellCount}
        pattern={pattern}
        savePattern={saveGridAsPattern}
        savePatternModalOpen={savePatternModalOpen}
        setSavePatternModalOpen={setPatternModalOpen}
        renderInterval={renderInterval}
        allPatterns={patterns}
        color={color}
        game={game}/>
      <CanvasGrid
        configuration={{
          ...configuration,
          canvasLength: dynamics.canvasLength.get(),
          lineSeparation: dynamics.lineSeparation.get(),
          cellCount: cellCount.get(),
          color: color.get()
        }}
        grid={game.current}
        onCellClick={game.cellClicked}/>
      <PatternSavedNotification
        open={showPatternSaveNotification}
        hide={() => {
          setShowPatternSaveNotification(false)
          setRecentlySavedPattern(null)
        }}
        patternName={recentlySavedPattern && recentlySavedPattern.name}/>
    </KeyDownListener>
  )
}

export default App
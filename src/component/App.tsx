import * as React from 'react'
import CanvasGrid from './CanvasGrid'
import ControlPanel from './ControlPanel'
import CanvasConfig from '../model/CanvasConfig'
import useGame from './hook/useGame'
import useDynamicConfigurations from './hook/useDynamicConfigurations'
import Pattern from '../Pattern'
import KeyDownListener from './KeyDownListener'
import saveKeyHandler from './saveKeyHandler'

import { Rules } from '../Types'

const SPACEBAR_KEY_NAME = ' '

type Props = {
  rules: Rules
  presetPatterns: Pattern[]
  initialPattern: Pattern
  configuration: CanvasConfig
  interval: number
  savePattern: (pattern: Pattern) => void
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
  const game = useGame({ cellCount, renderInterval, pattern, rules })
  const saveGridAsPattern = (name: string = Math.random().toString()) => {
    props.savePattern(game.current.toPattern(name))
    alert(`Pattern saved: ${name}`)
  }
  return (
    <KeyDownListener className="app-container"
      handlers={[
        { keyName: SPACEBAR_KEY_NAME, onKeyDown: game.togglePlaying },
        { keyName: 's', onKeyDown: saveKeyHandler(saveGridAsPattern)  }
      ]}>
      <ControlPanel
        cellCount={cellCount}
        pattern={pattern}
        savePattern={saveGridAsPattern}
        renderInterval={renderInterval}
        allPatterns={props.presetPatterns}
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
    </KeyDownListener>
  )
}
export default App
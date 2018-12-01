import * as React from 'react'
import CanvasGrid from './CanvasGrid'
import ControlPanel from './ControlPanel'
import CanvasConfig from '../model/CanvasConfig'
import useGame from './hook/useGame'
import useDynamicConfigurations from './hook/useDynamicConfigurations'
import Pattern from '../model/Pattern'

import { Rules } from '../Types'

type Props = {
  rules: Rules
  presetPatterns: Pattern[]
  initialPattern: Pattern
  configuration: CanvasConfig
  interval: number
}
/**
 * TODO for resizing
 * - uniform moving around of pattern while fluctuating cell count
 * - adjust borders to keep them proportional to grid size
 */

const App: React.FC<Props> = props => {
  const { configuration } = props
  const {
    cellCount, renderInterval, pattern, ...dynamics
  } = useDynamicConfigurations({
    lineSeparation: configuration.lineSeparation,
    cellCount: configuration.cellCount,
    canvasLength: configuration.canvasLength,
    renderInterval: props.interval,
    pattern: props.initialPattern
  })
  const lineSeparation = dynamics.lineSeparation.get()
  const canvasLength = dynamics.canvasLength.get()
  const game = useGame({
    cellCount, renderInterval, pattern, rules: props.rules })
  return <div>
    <ControlPanel
      cellCount={cellCount}
      pattern={pattern}
      renderInterval={renderInterval}
      allPatterns={props.presetPatterns}
      game={game}/>
    <CanvasGrid
      configuration={{
        ...configuration, cellCount: cellCount.get(), lineSeparation, canvasLength
      }}
      grid={game.current}
      onCellClick={game.cellClicked}/>
  </div>
}

export default App
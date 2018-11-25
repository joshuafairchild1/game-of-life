import * as React from 'react'
import CanvasGrid from './CanvasGrid'
import ControlPanel from './ControlPanel'
import CanvasConfig from '../model/CanvasConfig'
import useGame from './hook/useGame'
import { Rules } from '../Types'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faRedo, faPause, faPlay, faStepForward, faStepBackward
} from '@fortawesome/free-solid-svg-icons'
import Pattern from '../model/Pattern'

library.add(faRedo, faPause, faPlay, faStepForward, faStepBackward)

type Props = {
  rules: Rules
  presetPatterns: Pattern[]
  initialPattern: Pattern
  configuration: CanvasConfig
  interval: number
}

const App: React.FC<Props> = (props: Props) => {
  const { configuration } = props
  const game = useGame(
    props.initialPattern, configuration.cellCount, props.rules, props.interval)
  return <div>
    <ControlPanel
      changePattern={game.changePattern}
      patternOptions={props.presetPatterns}
      selectedPattern={game.pattern}
      generationIndex={game.generationIndex()}
      isPaused={!game.isRunning()}
      reset={game.reset}
      pause={game.pause}
      resume={game.resume}
      step={game.stepCurrentGeneration}
      interval={game.renderInterval}
      setRenderInterval={game.setRenderInterval}/>
    <CanvasGrid
      config={configuration}
      grid={game.current}
      onCellClick={game.cellClicked}/>
  </div>
}

export default App
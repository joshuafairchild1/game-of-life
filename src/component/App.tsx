import * as React from 'react'
import CanvasGrid from './CanvasGrid'
import ControlPanel from './ControlPanel'
import Grid from '../model/Grid'
import CanvasConfig from '../model/CanvasConfig'
import useGame from './hook/useGame'
import { Rules } from '../Types'

type Props = {
  rules: Rules
  grid: Grid
  configuration: CanvasConfig
  interval: number
}

const App: React.FC<Props> = (props: Props) => {
  const game = useGame(props.grid, props.rules, props.interval)
  return <div>
    <ControlPanel
      isFirstGeneration={game.generationIndex === 0}
      isPaused={!game.isRunning()}
      reset={game.reset}
      pause={game.pause}
      resume={game.resume}
      move={game.moveGeneration}/>
    <CanvasGrid
      config={props.configuration}
      grid={game.current}
      onCellClick={game.cellClicked}/>
  </div>
}

export default App
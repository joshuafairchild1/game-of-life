import * as React from 'react'
import PatternPicker from './PatternPicker'
import Pattern from '../model/Pattern'
import Direction from '../Direction'
import Card from '@material-ui/core/Card/Card'
import Input from '@material-ui/core/Input/Input'
import GenerationInput from './GenerationInput'

import { ChangeEvent } from 'react'
import { Pause, PlayArrow, Replay, SkipNext, SkipPrevious } from '@material-ui/icons'
import { Game } from './hook/useGame'
import { DynamicConfiguration } from '../Types'

type Props = {
  allPatterns: Pattern[]
  game: Game
  cellCount: DynamicConfiguration<number>
  pattern: DynamicConfiguration<Pattern>
  renderInterval: DynamicConfiguration<number>
}

const ControlPanel: React.FC<Props> = props => {
  const { game } = props
  const generationIndex = game.generationIndex()
  const isFirstGeneration = generationIndex === 0
  const changeInterval = (event: ChangeEvent<HTMLInputElement>) =>
    props.renderInterval.set(parseInt(event.target.value) || 0)
  const isPaused = !game.isRunning()
  return <Card className="controls">
    <div className="control-icons">
      <Replay titleAccess="Restart"
              className={iconClass(isFirstGeneration) + 'icon-reset'}
              onClick={game.reset}/>
      {isPaused
        ? <PlayArrow titleAccess="Play"
                     className={iconClass()}
                     onClick={game.resume}/>
        : <Pause titleAccess="Pause"
                 className={iconClass()}
                 onClick={game.pause}/>}
      <SkipPrevious titleAccess="Step Back"
                    className={iconClass(isFirstGeneration || !isPaused)}
                    onClick={() => game.stepCurrentGeneration(Direction.Backward)}/>
      <SkipNext titleAccess="Step Forward"
                className={iconClass(!isPaused)}
                onClick={() => game.stepCurrentGeneration(Direction.Forward)}/>
    </div>
    <div className="control-pattern">
      <div><small>Preset Pattern</small></div>
      <PatternPicker
        onSelect={props.pattern.set}
        options={props.allPatterns}
        selected={props.pattern.get()}/>
    </div>
    <div className="control-generation-interval">
      <label>Generation interval (ms)</label>
      <Input value={props.renderInterval.get()}
             type="number" inputProps={{ min: 1 }}
             onChange={changeInterval}/>
    </div>
    <small>Current generation:&nbsp;</small>
    <GenerationInput
      currentGenerationIndex={generationIndex}
      onSubmit={game.setGenerationIndex}/>
    <div className="control-cell-count">
      <small>Dimensions</small>
      <Input value={props.cellCount.get() || 3} type="number"
             inputProps={{ min: 3, max: 100 }}
             onChange={event =>
               props.cellCount.set(parseInt(event.target.value) || 3)}/>
      x {props.cellCount.get()}
    </div>
  </Card>
}

export default ControlPanel

function iconClass(disabled: boolean = false) {
  return (disabled ? ' not-allowed' : '') + ' control-icon '
}
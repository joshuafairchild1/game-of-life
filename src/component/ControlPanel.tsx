import * as React from 'react'
import PatternPicker from './PatternPicker'
import Pattern from '../game/Pattern'
import Direction from '../Direction'
import Card from '@material-ui/core/Card/Card'
import GenerationInput from './GenerationInput'
import Slider from '@material-ui/lab/Slider/Slider'
import ColorPicker from './ColorPicker'
import SaveCurrentPattern from './SaveCurrentPattern'

import { Pause, PlayArrow, Replay, SkipNext, SkipPrevious } from '@material-ui/icons'
import { Game } from './hook/useGame'
import { DynamicConfiguration } from '../Types'
import { invert } from '../utils'

import './ControlPanel.scss'

type Props = {
  allPatterns: Pattern[]
  game: Game
  cellCount: DynamicConfiguration<number>
  pattern: DynamicConfiguration<Pattern>
  renderInterval: DynamicConfiguration<number>
  color: DynamicConfiguration<string>
  savePattern: (name: string) => void
  savePatternModalOpen: boolean
  setSavePatternModalOpen: (isOpen: boolean) => void
  deletePattern: (pattern: Pattern) => void
}

const CELLS_MIN = 3
const CELLS_MAX = 75
const INTERVAL_MIN_MS = 10
const INTERVAL_MAX_MS = 500

const ControlPanel: React.FC<Props> = props => {
  const { game, renderInterval, pattern } = props
  const generationIndex = game.generationIndex()
  const isFirstGeneration = generationIndex === 0
  const isPaused = !game.isRunning()
  const cellCount = props.cellCount.get()
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
      <div><small>Pattern</small></div>
      <PatternPicker
        onSelect={newPattern => {
          game.pause()
          pattern.set(newPattern)
        }}
        options={props.allPatterns}
        selected={pattern.get()}
        deletePattern={props.deletePattern}/>
    </div>
    <small>Current generation:&nbsp;</small>
    <GenerationInput
      currentGenerationIndex={generationIndex}
      onSubmit={game.setGenerationIndex}/>
    <div className="control-generation-interval control-slider">
      <label>Speed</label>
      <Slider value={invert(renderInterval.get(), INTERVAL_MIN_MS, INTERVAL_MAX_MS)}
              min={INTERVAL_MIN_MS} max={INTERVAL_MAX_MS} step={1}
              onChange={(_, value) =>
                renderInterval.set(invert(value, INTERVAL_MIN_MS, INTERVAL_MAX_MS))}/>
    </div>
    <div className="control-cell-container">
      <small>Dimensions: {cellCount} x {cellCount} </small>
      <div className="control-cell-count control-slider">
        <small className="cell-count-min">{CELLS_MIN} &nbsp;</small>
        <Slider value={cellCount}
                min={CELLS_MIN} max={CELLS_MAX} step={1}
                onChange={(_, value) => props.cellCount.set(value)}/>
        <small className="cell-count-max">&nbsp; {CELLS_MAX}</small>
      </div>
    </div>
    <div className="lower-controls-container">
      <ColorPicker color={props.color}/>
      <SaveCurrentPattern
        modalOpen={props.savePatternModalOpen}
        setModalOpen={props.setSavePatternModalOpen}
        onSave={props.savePattern}/>
    </div>
  </Card>
}

export default ControlPanel

function iconClass(disabled: boolean = false) {
  return (disabled ? ' not-allowed' : '') + ' control-icon '
}
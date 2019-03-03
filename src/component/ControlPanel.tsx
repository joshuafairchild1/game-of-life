import * as React from 'react'
import PatternPicker from './PatternPicker'
import Pattern from '../game/Pattern'
import Direction from '../Direction'
import Card from '@material-ui/core/Card/Card'
import GenerationInput from './GenerationInput'
import Slider from '@material-ui/lab/Slider/Slider'
import ColorPicker from './ColorPicker'
import SavePatternIcon from './SavePatternIcon'
import useAppState from '../state/useAppState'
import PatternStorage from '../PatternStorage'
import usePatterns from './hook/usePatterns'
import allPatterns from '../game/patterns'
import { Pause, PlayArrow, Replay, SkipNext, SkipPrevious } from '@material-ui/icons'
import { Game } from './hook/useGame'
import { invert } from '../utils'

import './ControlPanel.scss'

type Props = {
  game: Game
  presetPatterns: Pattern[]
  storage: PatternStorage
}

// const CELLS_MIN = 3
// const CELLS_MAX = 75
const INTERVAL_MIN_MS = 10
const INTERVAL_MAX_MS = 500

const ControlPanel: React.FC<Props> = props => {
  const {
    selectedPattern, renderInterval, recentlySavedPattern,
    showPatternSaveNotification
  } = useAppState()
  const { patterns, addPattern, removePattern } = usePatterns(props.presetPatterns)
  const { game } = props
  const generationIndex = game.generationIndex()
  const isFirstGeneration = generationIndex === 0
  const isPaused = !game.isRunning
  const savePattern = (name: string) => {
    const newPattern = game.current.toPattern(name)
    props.storage.save(newPattern)
    addPattern(newPattern)
    recentlySavedPattern.set(newPattern)
    showPatternSaveNotification.set(true)
    selectedPattern.set(newPattern)
  }
  const deletePattern = (toDelete: Pattern) => {
    props.storage.delete(toDelete)
    removePattern(toDelete)
    if (toDelete.name === selectedPattern.get().name) {
      selectedPattern.set(allPatterns.Empty)
    }
  }

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
          selectedPattern.set(newPattern)
        }}
        options={patterns}
        selected={selectedPattern.get()}
        deletePattern={deletePattern}/>
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
    {/*<div className="control-cell-container">*/}
      {/*<small>Dimensions: {cellCount.get()} x {cellCount.get()} </small>*/}
      {/*<div className="control-cell-count control-slider">*/}
        {/*<small className="cell-count-min">{CELLS_MIN} &nbsp;</small>*/}
        {/*<Slider value={cellCount.get()}*/}
                {/*min={CELLS_MIN} max={CELLS_MAX} step={1}*/}
                {/*onChange={(_, value) => cellCount.set(value)}/>*/}
        {/*<small className="cell-count-max">&nbsp; {CELLS_MAX}</small>*/}
      {/*</div>*/}
    {/*</div>*/}
    <div className="lower-controls-container">
      <ColorPicker/>
      <SavePatternIcon onSave={savePattern}/>
    </div>
  </Card>
}

export default ControlPanel

function iconClass(disabled: boolean = false) {
  return (disabled ? ' not-allowed' : '') + ' control-icon '
}
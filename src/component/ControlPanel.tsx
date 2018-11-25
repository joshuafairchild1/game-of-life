import * as React from 'react'
import PatternPicker from './PatternPicker'
import Pattern from '../model/Pattern'
import Direction from '../Direction'
import { ChangeEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  isPaused: boolean
  generationIndex: number
  interval: number
  selectedPattern: Pattern
  patternOptions: Pattern[]
  changePattern: (next: Pattern) => void
  reset: () => void
  pause: () => void
  resume: () => void
  step: (direction: Direction) => void
  setRenderInterval: (generationsPerSecond: number) => void
}

const ControlPanel: React.FC<Props> = (props: Props) => {
  const isFirstGeneration = props.generationIndex === 0
  const changeInterval = (event: ChangeEvent<HTMLInputElement>) =>
    props.setRenderInterval(parseInt(event.target.value) || 0)
  return <div className="controls">
    <div>
      <button className="control-icon"
              disabled={isFirstGeneration}
              onClick={props.reset}>
        <FontAwesomeIcon icon="redo"/>
      </button>
      <button className="control-icon"
              disabled={props.isPaused}
              onClick={props.pause}>
        <FontAwesomeIcon icon="pause"/>
      </button>
      <button className="control-icon"
              disabled={!props.isPaused}
              onClick={props.resume}>
        <FontAwesomeIcon icon="play"/>
      </button>
      <button className="control-icon"
              disabled={isFirstGeneration || !props.isPaused}
              onClick={() => props.step(Direction.Backward)}>
        <FontAwesomeIcon icon="step-backward"/>
      </button>
      <button className="control-icon"
              disabled={!props.isPaused}
              onClick={() => props.step(Direction.Forward)}>
        <FontAwesomeIcon icon="step-forward"/>
      </button>
    </div>
    <div className="control-pattern">
      <PatternPicker onSelect={props.changePattern}
                     options={props.patternOptions}
                     selected={props.selectedPattern}/>
    </div>
    <div className="control-generations">
      <label>Generation interval (ms)</label>
      <input value={props.interval}
             type="number" min={1}
             onChange={changeInterval}/>
    </div>
    <small>Current generation: {props.generationIndex}</small>
  </div>
}

export default ControlPanel
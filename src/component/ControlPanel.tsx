import * as React from 'react'
import { Direction } from './hook/useGame'

type Props = {
  isPaused: boolean
  isFirstGeneration: boolean
  reset: () => void
  pause: () => void
  resume: () => void
  move: (direction: Direction) => void
}

const ControlPanel: React.FC<Props> = (props: Props) =>
  <>
    <button disabled={props.isFirstGeneration}
            onClick={props.reset}>Reset</button>
    <button disabled={props.isPaused}
            onClick={props.pause}>Pause</button>
    <button onClick={props.resume}>Play</button>
    <button disabled={props.isFirstGeneration || !props.isPaused}
            onClick={() => props.move(Direction.Backward)}>Step back</button>
    <button disabled={!props.isPaused}
            onClick={() => props.move(Direction.Forward)}>Step forward</button>
  </>

export default ControlPanel
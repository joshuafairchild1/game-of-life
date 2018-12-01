import useInterval from './useInterval'
import { useState } from 'react'
import { DynamicConfiguration } from '../../Types'
import Pattern from '../../model/Pattern'

export type DynamicConfigurations = {
  renderInterval: DynamicConfiguration<number> & { getPrevious: () => number }
  cellCount: DynamicConfiguration<number>
  lineSeparation: DynamicConfiguration<number>
  canvasLength: DynamicConfiguration<number>
  pattern: DynamicConfiguration<Pattern>
}

type Configurations = { [K in keyof DynamicConfigurations]: any }

export default function useDynamicConfigurations<T>(
  initial: Configurations
): DynamicConfigurations {
  const {
    current: renderInterval, previous: lastRenderInterval, setIntervalState
  } = useInterval(initial.renderInterval)
  const [ cellCount, setCellCountState ] = useState(initial.cellCount)
  const [ lineSeparation, setLineSeparation ] = useState(initial.lineSeparation)
  const [ canvasLength, setCanvasLength ] = useState(initial.canvasLength)
  const [ pattern, setPattern ] = useState(initial.pattern)
  function setCellCount(newValue: number) {
    setLineSeparation(initial.canvasLength / newValue)
    setCellCountState(newValue)
  }
  return {
    renderInterval: {
      getPrevious: () => lastRenderInterval,
      get: () => renderInterval,
      set: setIntervalState
    },
    cellCount: {
      get: () => cellCount,
      set: setCellCount
    },
    lineSeparation: {
      get: () => lineSeparation,
      set: setLineSeparation
    },
    pattern: {
      get: () => pattern,
      set: setPattern
    },
    canvasLength: {
      get: () => canvasLength,
      set: setCanvasLength
    }
  }
}
import { useState } from 'react'
import { DynamicConfiguration } from '../../Types'
import Pattern from '../../model/Pattern'

export type DynamicConfigurations = {
  renderInterval: DynamicConfiguration<number>
  cellCount: DynamicConfiguration<number>
  lineSeparation: DynamicConfiguration<number>
  canvasLength: DynamicConfiguration<number>
  pattern: DynamicConfiguration<Pattern>
  color: DynamicConfiguration<string>
}

type Configurations = { [K in keyof DynamicConfigurations]: any }

const define = <T>([ value, set ]: [ T, (value: T) => void ]) =>
  ({ get: () => value, set })

export default function useDynamicConfigurations<T>(
  initial: Configurations
): DynamicConfigurations {
  const [ cellCount, setCellCountState ] = useState(initial.cellCount)
  const lineSeparation = define(useState(initial.lineSeparation))
  function setCellCount(newValue: number) {
    lineSeparation.set(initial.canvasLength / newValue)
    setCellCountState(newValue)
  }
  return {
    renderInterval: define(useState(initial.renderInterval)),
    pattern: define(useState(initial.pattern)),
    canvasLength: define(useState(initial.canvasLength)),
    color: define(useState(initial.color)),
    lineSeparation, cellCount: { get: () => cellCount, set: setCellCount }
  }
}
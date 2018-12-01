import Grid from '../../model/Grid'
import useGenerations from './useGenerations'
import Pattern from '../../model/Pattern'
import Direction from '../../Direction'
import Cell from '../../model/Cell'

import { Rules } from '../../Types'
import { timed } from '../../utils'
import { useEffect, useLayoutEffect, useState } from 'react'
import { DynamicConfigurations } from './useDynamicConfigurations'

export interface Game {
  current: Grid,
  reset: VoidFunction,
  pause: VoidFunction,
  resume: VoidFunction,
  stepCurrentGeneration: (direction: Direction) => void,
  cellClicked: (cellX: number, cellY: number) => void,
  isRunning: () => boolean,
  generationIndex: () => number,
  setGenerationIndex: (targetIndex: number) => void
}

export type GameConfiguration = {
  cellCount: DynamicConfigurations['cellCount']
  renderInterval: DynamicConfigurations['renderInterval']
  pattern: DynamicConfigurations['pattern']
  rules: Rules
}

export default function useGame({ rules, ...configuration }: GameConfiguration): Game {
  const renderInterval = configuration.renderInterval.get()
  const cellCount = configuration.cellCount.get()
  const pattern = configuration.pattern.get()
  const [ timeout, setRenderTimeout ] = useState<any | null>(null)
  const gridOf = (pattern: Pattern, id: number) =>
    Grid.createWithLength(cellCount, id, pattern)
  const {
    currentGeneration: { current, ref }, setCurrent,
    generations, addGeneration, setGenerations, resetGenerations
  } = useGenerations(gridOf(pattern, 0))

  useEffect(() => {
    // if the interval changes, the next generation must be rescheduled
    // to start generations on the new interval
    if (renderInterval !== configuration.renderInterval.getPrevious() && isRunning()) {
      _scheduleNextGeneration()
    }
  }, [ renderInterval ])

  useLayoutEffect(_updateCurrentGrid, [ cellCount ])

  useEffect(_applyNewPattern, [ pattern ])

  const generationIndex = () => {
    const index = generations.findIndex(it => it.id === ref.current.id)
    if (index === -1) {
      throw Error(
        `BUG: could not determine index of current generation
         generations: ${generations.length}
         currentGeneration id: ${current.id}`
      )
    }
    return index
  }

  const isRunning = () => timeout !== null

  const resume = () => !isRunning() && _scheduleNextGeneration()

  function reset() {
    console.log('resetting game to generation 0')
    pause()
    resetGenerations()
  }

  function _applyNewPattern() {
    resetGenerations()
    const newGrid = gridOf(pattern, current.id)
    setCurrent(newGrid)
    setGenerations([ newGrid ])
  }

  function pause() {
    clearInterval(timeout)
    setRenderTimeout(null)
  }

  function cellClicked(x: number, y: number) {
    current.toggleCell(x, y)
    // toggling a cell is a deeply-nested change, so making a copy to force
    // the state change to propagate down
    setCurrent(current.copy)
  }

  function stepCurrentGeneration(direction: Direction) {
    if (!isRunning()) {
      direction === Direction.Forward
        ? _stepForward() : _stepBackward()
    }
  }

  function setGenerationIndex(nextIndex: number) {
    const currentIndex = generationIndex()
    if (currentIndex === nextIndex) {
      return
    }
    if (nextIndex < currentIndex) {
      const target = generations[nextIndex]
      _setMostRecentGeneration(target, nextIndex + 1)
    } else {
      timed(`progress generations to ${nextIndex}`,
        () => _progressGenerations(nextIndex))
    }
  }

  function _updateCurrentGrid() {
    // TODO: grid.cloneToLength()
    if (cellCount === current.length) {
      return
    }
    const nextGridIsLarger = current.length < cellCount
    const nextGrid = Grid.createWithLength(cellCount, current.id)
    if (nextGridIsLarger) {
      const distance = cellCount - current.length
      current.forEach(cell =>
        nextGrid.set(new Cell(cell.x + distance, cell.y + distance, cell.status)))
    } else {
      const distance = current.length - cellCount
      current.forEach(cell => {
        const x = cell.x - distance
        const y = cell.y - distance
        if (x >= 0 && y >= 0) {
          nextGrid.set(new Cell(x, y, cell.status))
        }
      })
    }
    setGenerations([ ...generations.slice(0, generations.length - 1), nextGrid ])
    setCurrent(nextGrid)
  }

  function _stepBackward() {
    const currentIndex = generationIndex()
    const target = generations[ currentIndex - 1 ]
    if (target) {
      _setMostRecentGeneration(target, currentIndex)
    }
  }

  function _setMostRecentGeneration(target: Grid, generationsLength: number) {
    setCurrent(target)
    setGenerations(generations.slice(0, generationsLength))
  }

  function _progressGenerations(targetGenerationIndex: number) {
    const delta = targetGenerationIndex - generationIndex()
    const newGenerations = []
    let lastNewGeneration = current
    for (let i = 0; i < delta; i++) {
      lastNewGeneration = rules(lastNewGeneration)
      newGenerations.push(lastNewGeneration)
    }
    setGenerations([ ...generations, ...newGenerations ])
    setCurrent(lastNewGeneration)
  }

  function _scheduleNextGeneration() {
    // console.warn('scheduling next generation in ', renderInterval, 'ms')
    clearInterval(timeout)
    _stepForward()
    setRenderTimeout(setInterval(_stepForward, renderInterval))
  }

  /**
   * this may be called asynchronously, so it's important to use the
   * ref to get the up-to-date value during (potentially suspended) execution
   * @see {useGenerations}
   */
  function _stepForward() {
    const next = timed('apply rules', () => rules(ref.current))
    addGeneration(next)
    setCurrent(next)
  }

  return {
    reset, pause, resume, stepCurrentGeneration, cellClicked, isRunning,
    current, generationIndex, setGenerationIndex
  }
}
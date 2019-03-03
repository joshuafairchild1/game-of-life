import Grid from '../../game/Grid'
import useGenerations from './useGenerations'
import Pattern from '../../game/Pattern'
import Direction from '../../Direction'
import useAppState from '../../state/useAppState'
import values from '../../state/values'
import { Rules } from '../../Types'
import { timed } from '../../utils'
import { useEffect, useLayoutEffect, useState } from 'react'

export interface Game {
  current: Grid,
  reset: VoidFunction,
  pause: VoidFunction,
  resume: VoidFunction,
  togglePlaying: VoidFunction
  stepCurrentGeneration(direction: Direction): void,
  cellClicked(cellX: number, cellY: number): void,
  generationIndex(): number,
  setGenerationIndex(targetIndex: number): void
  isRunning: boolean,
}

export default function useGame(rules: Rules): Game {
  const {
    selectedPattern, renderInterval, cellCount
  } = values(useAppState('selectedPattern', 'renderInterval', 'cellCount'))
  // timeout is kept in state rather than a ref so that components
  // can get a re-render when it changes
  const [ timeout, setNextTimeout ] = useState<any | null>(null)
  const gridOf = (pattern: Pattern, id: number) => Grid.createWithLength(cellCount, id, pattern)
  const {
    currentGeneration: { current, ref }, setCurrent,
    generations, addGeneration, setGenerations, resetGenerations
  } = useGenerations(gridOf(selectedPattern, 0))

  const isRunning = timeout !== null

  useLayoutEffect(_updateCurrentGrid, [ cellCount ])

  useEffect(_applyNewPattern, [ selectedPattern ])

  useEffect(() => {
    isRunning && _scheduleNextGeneration()
    // not putting `timeout` in the input list because we only want to
    // reschedule when the interval itself changes, elsewise the
    // game will infinitely reschedule itself
  }, [ renderInterval ])

  const generationIndex = () => {
    const index = generations.findIndex(it => it.id === ref.current.id)
    if (index === -1) {
      throw Error(
        `BUG: could not determine index of current generation.
         generations: ${generations.length}
         currentGeneration id: ${current.id}`
      )
    }
    return index
  }

  const resume = () => !isRunning && _scheduleNextGeneration()

  const togglePlaying = () => isRunning ? pause() : resume()

  function reset() {
    console.log('resetting game to generation 0')
    pause()
    resetGenerations()
  }

  function pause() {
    clearInterval(timeout)
    setNextTimeout(null)
  }

  function cellClicked(x: number, y: number) {
    current.toggleCell(x, y)
    // toggling a cell is a deeply-nested change, so making a copy to force
    // the state change to propagate down
    setCurrent(current.copy)
  }

  function stepCurrentGeneration(direction: Direction) {
    if (!isRunning) {
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
    if (cellCount === current.length) {
      return
    }
    const nextGrid = current.copyToLength(cellCount)
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
    let mostRecent = current
    for (let i = 0; i < delta; i++) {
      mostRecent = rules(mostRecent)
      newGenerations.push(mostRecent)
    }
    setGenerations([ ...generations, ...newGenerations ])
    setCurrent(mostRecent)
  }

  function _scheduleNextGeneration() {
    // console.warn('scheduling next generation in ', renderInterval, 'ms')
    clearInterval(timeout)
    _stepForward()
    setNextTimeout(setInterval(_stepForward, renderInterval))
  }

  /**
   * this may be called asynchronously, so it's important to use the
   * ref to get the up-to-date value during (potentially suspended) execution
   * @see {useGenerations}
   */
  function _stepForward() {
    const next = rules(ref.current)
    addGeneration(next)
    setCurrent(next)
  }

  function _applyNewPattern() {
    resetGenerations()
    const newGrid = gridOf(selectedPattern, current.id)
    setCurrent(newGrid)
    setGenerations([ newGrid ])
  }

  return {
    reset, pause, resume, stepCurrentGeneration, cellClicked, isRunning,
    current, generationIndex, setGenerationIndex, togglePlaying
  }
}
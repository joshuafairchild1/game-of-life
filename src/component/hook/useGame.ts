import Grid from '../../model/Grid'
import { useEffect, useState } from 'react'
import useGenerations from './useGenerations'
import { Rules } from '../../Types'
import useInterval from './useInterval'
import Pattern from '../../model/Pattern'
import Direction from '../../Direction'

export default function useGame(
  initial: Pattern, cellCount: number, rules: Rules, initialInterval: number
) {
  const gridOf = (pattern: Pattern) => Grid.createWithLength(cellCount, pattern)
  const [ pattern, setPattern ] = useState(initial)
  const [ timeout, setRenderTimeout ] = useState<any | null>(null)
  const {
    current: renderInterval, previous: lastRenderInterval, setIntervalState
  } = useInterval(initialInterval)
  const {
    currentGeneration: { current, ref }, setCurrent,
    generations, addGeneration, setGenerations, resetGenerations
  } = useGenerations(gridOf(pattern))

  useEffect(() => {
    // if the interval changes, the next generation must be rescheduled
    // to start generations on the new interval
    if (renderInterval !== lastRenderInterval && isRunning()) {
      _scheduleNextGeneration()
    }
  }, [ renderInterval ])

  const generationIndex = () => generations.findIndex(it => it.id === current.id)

  const isRunning = () => timeout !== null

  const resume = () => !isRunning() && _scheduleNextGeneration()

  function reset() {
    console.log('resetting game to generation 0')
    pause()
    resetGenerations()
  }

  function changePattern(newPattern: Pattern) {
    resetGenerations()
    setPattern(newPattern)
    const newGrid = gridOf(newPattern)
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
    const currentIndex = generationIndex()
    if (isRunning() || currentIndex === -1) {
      return
    }
    direction === Direction.Forward ? _stepForward() : _stepBackward()
  }

  function _stepBackward() {
    const currentIndex = generationIndex()
    if (isRunning() || currentIndex === -1) {
      return
    }
    const target = generations[ currentIndex - 1 ]
    if (target) {
      setCurrent(target)
      setGenerations(generations.slice(0, currentIndex))
    }
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
    const next = rules(ref.current)
    setCurrent(next)
    addGeneration(next)
  }

  return {
    reset, pause, resume, stepCurrentGeneration, cellClicked, isRunning,
    current, generationIndex, renderInterval, setRenderInterval: setIntervalState,
    changePattern, pattern
  }
}
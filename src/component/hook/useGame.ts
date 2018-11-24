import Grid from '../../model/Grid'
import { useState } from 'react'
import useGenerations from './useGenerations'
import { Rules } from '../../Types'

export enum Direction { Forward, Backward }

export default function useGame(initial: Grid, rules: Rules, interval: number) {
  const [ timeout, setRenderTimeout ] = useState<any | null>(null)
  const {
    currentGeneration: { current, ref }, setCurrent,
    generations, add, clear
  } = useGenerations(initial)

  function generationIndex() {
    return generations.findIndex(it => it.id === current.id)
  }

  function isRunning() {
    return timeout !== null
  }

  function reset() {
    console.log('resetting game to generation 0')
    pause()
    const [ initial ] = generations
    setCurrent(initial)
    clear()
  }

  function pause() {
    clearInterval(timeout)
    setRenderTimeout(null)
  }

  function resume() {
    if (!isRunning()) {
      nextGeneration()
      setRenderTimeout(setInterval(nextGeneration, interval))
    }
  }

  function cellClicked(x: number, y: number) {
    current.toggleCell(x, y)
    // toggling a cell is a deeply-nested change, so making a copy to force
    // the state change to propagate down
    setCurrent(current.copy)
  }

  function moveGeneration(direction: Direction) {
    if (isRunning()) {
      return
    }
    const currentIndex = generationIndex()
    if (currentIndex === -1) {
      return
    }
    const targetIndex = direction === Direction.Backward
      ? currentIndex - 1 : currentIndex + 1
    const target = generations[ targetIndex ]
    if (target) {
      console.log(
        `moving current generation from '${currentIndex}' -> '${targetIndex}'`)
      setCurrent(target)
    } else if (direction === Direction.Forward) {
      nextGeneration()
    }
  }

  function nextGeneration(current: Grid = ref.current) {
    const next = rules(current)
    setCurrent(next)
    add(next)
  }

  return {
    reset, pause, resume, moveGeneration, cellClicked, isRunning,
    current, generationIndex: generationIndex()
  }
}
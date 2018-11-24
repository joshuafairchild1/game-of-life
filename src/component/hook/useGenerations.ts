import Grid from '../../model/Grid'
import { useRef, useState } from 'react'

function usePersistentRef<T>(state: T) {
  const ref = useRef(state)
  ref.current = state
  return ref
}

export default function useGenerations(
  initial: Grid
) {
  const [ current, setCurrent ] = useState(initial)
  const [ generations, setGenerations ] = useState([ current ])
  /** @see https://github.com/facebook/react/issues/14010 */
  const currentRef = usePersistentRef(current)
  const generationsRef = usePersistentRef(generations)

  const add = (next: Grid) =>
    setGenerations(generationsRef.current.concat(next))
  const clear = () => {
    Grid.resetIdCounter()
    setGenerations([ generations[0] ])
  }
  return {
    currentGeneration: { current, ref: currentRef }, setCurrent,
    generations, add, clear
  }
}

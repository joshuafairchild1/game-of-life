import Grid from '../../model/Grid'
import { useRef, useState } from 'react'

/** https://github.com/facebook/react/issues/14010 */
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
  const currentRef = usePersistentRef(current)
  const generationsRef = usePersistentRef(generations)

  const addGeneration = (next: Grid) =>
    setGenerations(generationsRef.current.concat(next))
  const resetGenerations = () => {
    const [ initial ] = generations
    setCurrent(initial)
    setGenerations([ initial ])
  }
  return {
    currentGeneration: { current, ref: currentRef }, setCurrent,
    generations, addGeneration, setGenerations, resetGenerations
  }
}

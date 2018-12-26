import Pattern from '../../game/Pattern'
import { useState } from 'react'

export default function usePatterns(initial: Pattern[]) {
  const [ patterns, setPatterns ] = useState(initial)
  const addPattern = (newPattern: Pattern) =>
    setPatterns([ ...patterns, newPattern ])
  const removePattern = (pattern: Pattern) =>
    setPatterns(patterns.filter(it => it.name !== pattern.name))
  return { patterns, addPattern, removePattern }
}
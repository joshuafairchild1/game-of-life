import Pattern from '../../Pattern'
import { useState } from 'react'

export default function usePatterns(
  initial: Pattern[]
): [ Pattern[], (pattern: Pattern) => void ] {
  const [ patterns, setPatterns ] = useState(initial)
  const addPattern = (newPattern: Pattern) =>
    setPatterns([ ...patterns, newPattern ])
  return [ patterns, addPattern ]
}
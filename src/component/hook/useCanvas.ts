import { useEffect, useRef } from 'react'
import ContextWrapper from '../../ContextWrapper'

export default function useCanvas(defaultLineWidth: number) {
  const contextRef = useRef<ContextWrapper>(null)
  const canvasRef = useRef(null)
  useEffect(() => {
    if (canvasRef.current) {
      const actual = canvasRef.current.getContext('2d')
      contextRef.current = new ContextWrapper(actual, defaultLineWidth)
    }
  }, [])
  const withContext = (action: (context: ContextWrapper) => void) => {
    contextRef.current !== null && action(contextRef.current)
  }
  return { canvasRef, withContext }
}


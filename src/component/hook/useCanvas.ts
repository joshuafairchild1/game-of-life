import { useEffect, useRef, useState } from 'react'
import ContextWrapper from '../../ContextWrapper'

export default function useCanvas(defaultLineWidth: number) {
  const [ context, setContext ] = useState<ContextWrapper | null>(null)
  const canvasRef = useRef(null)
  useEffect(() => {
    if (canvasRef.current) {
      const actual = canvasRef.current.getContext('2d')
      setContext(new ContextWrapper(actual, defaultLineWidth))
    }
  }, [])
  return { canvasRef, context }
}


import { useRef, useState } from 'react'

export default function useInterval(initial: number) {
  const [ interval, setState ] = useState(initial)
  const lastInterval = useRef(initial)
  const setIntervalState = (next: number) => {
    lastInterval.current = interval
    setState(next)
  }
  return {
    current: interval,
    previous: lastInterval.current,
    setIntervalState
  }
}

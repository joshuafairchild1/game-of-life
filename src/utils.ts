import * as React from 'react'

export function timed<T>(label: string, operation: () => T) {
  const start = Date.now()
  const result = operation()
  console.debug('took', Date.now() - start, 'ms to', label)
  return result
}

export function isNumber(value: number) {
  return !Number.isNaN(value)
}

export function invert(value: number, min: number, max: number) {
  return Math.abs(value - max) + min
}

export type KeyEvent<T> = KeyboardEvent | React.KeyboardEvent<T>

export default function keyEventHandler<T = {}>(
  key: string,
  handler: (event: KeyEvent<T>) => void
) {
  return function handleKeyEvent(event: KeyEvent<T>) {
    if (event.key === key) {
      event.preventDefault()
      handler(event)
    }
  }
}

export function stopEvent(event: { stopPropagation: VoidFunction }) {
  event.stopPropagation()
  return true
}

export function ownKeys<T, K extends keyof T>(thing: T) {
  return Object.getOwnPropertyNames(thing) as K[]
}
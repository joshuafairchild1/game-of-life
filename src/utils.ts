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

export function stopEvent(event: React.SyntheticEvent) {
  event.stopPropagation()
  event.nativeEvent.stopImmediatePropagation()
  return true
}

export function ownKeys<T, K extends keyof T>(thing: T) {
  return Object.getOwnPropertyNames(thing) as K[]
}

export type KeyEvent<T = HTMLElement> = React.KeyboardEvent<T>

export interface KeyEventHandler {
  keyName: string
  handle(event: KeyEvent): void
}

export function handlerFor(
  keyName: string, handle: (event: KeyEvent) => void
): KeyEventHandler {
  return {
    keyName,
    handle: (event: KeyEvent) => {
      if (event.key === keyName) {
        stopEvent(event)
        handle(event)
      }
    }
  }
}
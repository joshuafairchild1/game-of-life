import * as React from 'react'

export type KeyEvent<T> = KeyboardEvent | React.KeyboardEvent<T>

export default function useKeyEffect<T = {}>(
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
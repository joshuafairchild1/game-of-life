import * as React from 'react'

export default function useEscapeKey<T>(onEscape: (event: React.KeyboardEvent<T>) => void) {
  return function handleKeyEvent(event: React.KeyboardEvent<T>) {
    if (event.key === 'Escape') {
      onEscape(event)
    }
  }
}
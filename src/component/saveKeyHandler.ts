import * as React from 'react'

export default function saveKeyHandler(
  onSave: VoidFunction
) {
  return function handleSave(event: React.KeyboardEvent<HTMLDivElement>) {
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
      onSave()
    }
  }
}
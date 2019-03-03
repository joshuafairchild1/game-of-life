import Pattern from '../../game/Pattern'
import { KeyEvent, stopEvent } from '../../utils'
import { SetStateAction, useState } from 'react'

const keyHandler = (
  keyName: string, onKeyDown: (event: KeyEvent<HTMLDivElement>) => void
) => ({ keyName, onKeyDown })

export default function usePickerControls(
  options: Pattern[], selected: Pattern,
  onSelected: (pattern: Pattern) => void,
  closePicker: VoidFunction,
  deletePattern: (pattern: Pattern) => void
) {
  const [ active, setActive ] = useState(selected)

  function focusItem(name: string) {
    if (!name) {
      setActive(selected)
    } else if (name !== active.name) {
      const pattern = Pattern.forName(name)
      setActive(pattern)
    }
  }

  function setActiveBy(getNextItem: (currentIndex: number) => Pattern) {
    const currentIndex = options.findIndex(it => it.name === active.name)
    if (currentIndex > -1) {
      const nextItem = getNextItem(currentIndex)
      setActive(nextItem)
    }
  }

  function focusNextItem(event: KeyEvent<HTMLDivElement>) {
    if (event.shiftKey) {
      focusPreviousItem(event)
    } else {
      stopEvent(event)
      setActiveBy(current => options[ current + 1 ] || options[ 0 ])
    }
  }

  function focusPreviousItem(event: KeyEvent<HTMLDivElement>) {
    stopEvent(event)
    setActiveBy(current => options[ current - 1 ] || options[ options.length - 1 ])
  }

  function selectActiveItem(doClose: boolean) {
    return function(event: KeyEvent<HTMLDivElement>) {
      stopEvent(event)
      if (active) {
        onSelected(active)
      }
      if (doClose) {
        closePicker()
      }
    }
  }

  function conditionalDeletePattern() {
    if (active && active.canDelete) {
      deletePattern(active)
      focusItem(options[ 0 ].name)
    }
  }

  return {
    activeItem: {
      get: () => active,
      set: (action: SetStateAction<Pattern>) => setActive(action)
    },
    handlers: [
      keyHandler('Tab', focusNextItem),
      keyHandler(' ', selectActiveItem(false)),
      keyHandler('Enter', selectActiveItem(true)),
      keyHandler('d', conditionalDeletePattern),
      keyHandler('Escape', closePicker),
      keyHandler('ArrowDown', focusNextItem),
      keyHandler('ArrowUp', focusPreviousItem)
    ],
    focusItem
  }
}


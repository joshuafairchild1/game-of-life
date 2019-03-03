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

  function selectActiveItem(doClose: boolean = false) {
    return function selectActiveItemFromEvent(event: KeyEvent<HTMLDivElement>) {
      stopEvent(event)
      if (active) {
        onSelected(active)
      }
      if (doClose) {
        closePicker()
      }
    }
  }

  function deleteIfAble() {
    if (active && active.canDelete) {
      deletePattern(active)
    }
  }

  const deleteHandler = (key: string) => keyHandler(key, deleteIfAble)

  return {
    activeItem: {
      get: () => active,
      set: (action: SetStateAction<Pattern>) => setActive(action)
    },
    handlers: [
      keyHandler('Tab', focusNextItem),
      keyHandler(' ', selectActiveItem()),
      keyHandler('Enter', selectActiveItem(true)),
      keyHandler('Escape', closePicker),
      keyHandler('ArrowDown', focusNextItem),
      keyHandler('ArrowUp', focusPreviousItem),
      deleteHandler('d'),
      deleteHandler('Backspace'),
      deleteHandler('Delete')
    ],
    focusItem
  }
}


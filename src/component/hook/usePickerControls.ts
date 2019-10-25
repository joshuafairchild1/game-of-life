import Pattern from '../../game/Pattern'
import Key from '../../Key'
import { handlerFor, KeyEvent, stopEvent } from '../../utils'
import { SetStateAction, useState } from 'react'

export default function usePickerControls(
  options: Pattern[],
  selected: Pattern,
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

  function focusPreviousItem(event?: KeyEvent<HTMLDivElement>) {
    event && stopEvent(event)
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
      focusPreviousItem()
    }
  }

  const handleDelete = (key: string) => handlerFor(key, deleteIfAble)

  return {
    activeItem: {
      get: () => active,
      set: (action: SetStateAction<Pattern>) => setActive(action)
    },
    handlers: [
      handlerFor(Key.Tab, focusNextItem),
      handlerFor(Key.Spacebar, selectActiveItem()),
      handlerFor(Key.Enter, selectActiveItem(true)),
      handlerFor(Key.Escape, closePicker),
      handlerFor(Key.ArrowDown, focusNextItem),
      handlerFor(Key.ArrowUp, focusPreviousItem),
      handleDelete(Key.Delete),
      handleDelete(Key.Backspace),
      handleDelete(Key.D)
    ],
    focusItem
  }
}


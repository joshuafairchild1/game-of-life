import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { DeleteForever } from '@material-ui/icons'
import Dropdown, { Option, toOption } from './dropdown/Dropdown'
import Pattern from '../game/Pattern'
import KeyDownListener from './KeyDownListener'
import { KeyEvent, stopEvent } from '../utils'

type Props = {
  options: Pattern[]
  selected: Pattern
  onSelect: (selected: Pattern) => void
  deletePattern: (pattern: Pattern) => void
}

const keyHandler = (
  keyName: string, onKeyDown: (event: KeyEvent<HTMLDivElement>) => void
) => ({ keyName, onKeyDown })

const PatternPicker: React.FC<Props> = props => {
  const { options, selected } = props
  const [ isOpen, setIsOpen ] = useState(false)
  const [ activeItem, setActiveItem ] = useState<Pattern>(selected)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selected.name !== activeItem.name) {
      setActiveItem(selected)
    }
  }, [ selected ])

  function handleSelect(patternName: string) {
    const pattern = options.find(it => it.name === patternName)
    if (!pattern) {
      console.warn('no pattern with name ', patternName)
      return
    }
    props.onSelect(pattern)
  }

  function focusItem(patternName: string) {
    if (!patternName) {
      setActiveItem(selected)
    } else if (patternName !== activeItem.name) {
      const pattern = Pattern.forName(patternName)
      setActiveItem(pattern)
    }
  }

  function focusNextItem(event: KeyEvent<HTMLDivElement>) {
    stopEvent(event)
    const currentIndex = options.findIndex(it => it.name === activeItem.name)
    if (currentIndex > -1) {
      const nextItem = event.shiftKey
        ? options[currentIndex - 1] || options[options.length - 1]
        : options[currentIndex + 1] || options[0]
      setActiveItem(nextItem)
    }
  }

  function selectActiveItem(event: KeyEvent<HTMLDivElement>) {
    stopEvent(event)
    if (activeItem) {
      props.onSelect(activeItem)
    }
  }

  function conditionalDeletePattern(event: KeyEvent<HTMLDivElement>) {
    if ((event.ctrlKey || event.metaKey)
      && activeItem && activeItem.canDelete) {
      props.deletePattern(activeItem)
    }
  }

  function closeMenu() {
    setIsOpen(false)
    setActiveItem(selected)
    containerRef.current.blur()
  }

  function renderItem(item: Option) {
    const pattern = Pattern.forName(item.label)
    return <>
      <span>{item.label}</span>
      &nbsp;
      {pattern.canDelete &&
      <DeleteForever
        titleAccess="Delete Pattern"
        onClick={event => stopEvent(event) && props.deletePattern(pattern)}/>}
    </>
  }

  return <KeyDownListener refAccess={containerRef} handlers={[
    keyHandler('Tab', focusNextItem),
    keyHandler(' ', selectActiveItem),
    keyHandler('Enter', selectActiveItem),
    keyHandler('d', conditionalDeletePattern),
    keyHandler('Escape', closeMenu),
  ]}>
    <Dropdown
      className="control-pattern-input"
      onChange={handleSelect}
      isOpen={isOpen}
      toggleOpen={() => setIsOpen(current => !current)}
      onItemActive={focusItem}
      options={options.map(toOption)}
      focused={toOption(activeItem)}
      selected={toOption(selected)}>
      {renderItem}
    </Dropdown>
  </KeyDownListener>
}

export default PatternPicker
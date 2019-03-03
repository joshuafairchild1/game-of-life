import * as React from 'react'
import Dropdown, { Option, toOption } from './dropdown/Dropdown'
import Pattern from '../game/Pattern'
import KeyDownListener from './KeyDownListener'
import usePickerControls from './hook/usePickerControls'
import useAppState from '../state/useAppState'
import useAutoFocusContainer from './hook/useAutoFocusContainer'
import { useEffect } from 'react'
import { DeleteForever } from '@material-ui/icons'
import { stopEvent } from '../utils'

type Props = {
  options: Pattern[]
  selected: Pattern
  onSelect: (selected: Pattern) => void
  deletePattern: (pattern: Pattern) => void
}

const PatternPicker: React.FC<Props> = props => {
  const { options, selected, onSelect, deletePattern } = props
  const { patternPickerOpen } = useAppState('patternPickerOpen')
  const {
    activeItem, handlers, ...controls
  } = usePickerControls(options, selected, onSelect, closeMenu, deletePattern)

  const isOpen = patternPickerOpen.get()

  useEffect(() => {
    if (selected.name !== activeItem.get().name) {
      activeItem.set(selected)
    }
  }, [ selected ])

  const containerRef = useAutoFocusContainer(() => isOpen, [ isOpen ])

  function handleSelect(patternName: string) {
    const pattern = options.find(it => it.name === patternName)
    if (!pattern) {
      console.warn('no pattern with name ', patternName)
      return
    }
    props.onSelect(pattern)
  }

  function closeMenu() {
    patternPickerOpen.set(false)
    activeItem.set(selected)
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

  return <KeyDownListener refAccess={containerRef} handlers={handlers}>
    <Dropdown
      className="control-pattern-input"
      onChange={handleSelect}
      isOpen={isOpen}
      toggleOpen={() => patternPickerOpen.set(current => !current)}
      onItemActive={controls.focusItem}
      options={options.map(toOption)}
      focused={toOption(activeItem.get())}
      selected={toOption(selected)}>
      {renderItem}
    </Dropdown>
  </KeyDownListener>
}

export default PatternPicker
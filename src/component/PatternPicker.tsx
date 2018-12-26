import * as React from 'react'
import Pattern from '../game/Pattern'
import Dropdown, { toOption } from './dropdown/Dropdown'
import { DeleteForever } from '@material-ui/icons'
import { stopEvent } from '../utils'

type Props = {
  options: Pattern[]
  selected: Pattern
  onSelect: (selected: Pattern) => void
  deletePattern: (pattern: Pattern) => void
}

const PatternPicker: React.FC<Props> = (
  { options, onSelect, selected, deletePattern }
) =>
  <Dropdown className="control-pattern-input"
            onChange={value => {
              const pattern = options.find(it => it.name === value)
              if (!pattern) {
                console.warn('no pattern with name ', value)
                return
              }
              onSelect(pattern)
            }}
            options={options.map(toOption)}
            selected={toOption(selected)}>
    {item => {
      const pattern = Pattern.forName(item.label)
      return <>
        <span>{item.label}</span>
        &nbsp;
        {pattern.canDelete &&
        <DeleteForever
          titleAccess="Delete Pattern"
          onClick={event => stopEvent(event) && deletePattern(pattern)}/>}
      </>
    }}
  </Dropdown>

export default PatternPicker
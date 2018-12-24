import * as React from 'react'
import Pattern from '../game/Pattern'
import { Select } from '@material-ui/core'

type Props = {
  options: Pattern[]
  selected: Pattern
  onSelect: (selected: Pattern) => void
}

const PatternPicker: React.FC<Props> = ({ options, onSelect, selected }) =>
  <Select className="control-pattern-input"
          value={selected.name}
          onChange={event =>
            onSelect(options.find(it => it.name === event.target.value))}>
    {options.map(({ name }) =>
      <option key={name} value={name}>{name}</option>)}
  </Select>

export default PatternPicker
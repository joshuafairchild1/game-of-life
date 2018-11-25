import * as React from 'react'
import Pattern from '../model/Pattern'
import { ChangeEvent } from 'react'

type Props = {
  options: Pattern[]
  selected: Pattern
  onSelect: (selected: Pattern) => void
}

const PatternPicker: React.FC<Props> = props => {
  const { options } = props
  const onSelect = (event: ChangeEvent<HTMLSelectElement>) =>
    props.onSelect(options.find(it => it.name === event.target.value))
  return <select value={props.selected.name}
                 onChange={onSelect}>
    {options.map(({ name }) =>
      <option key={name} value={name}>{name}</option>)}
  </select>
}
export default PatternPicker
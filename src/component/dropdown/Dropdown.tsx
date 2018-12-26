import * as React from 'react'
import { useEffect } from 'react'
import { ArrowDropDown } from '@material-ui/icons'
import { stopEvent } from '../../utils'

import './Dropdown.scss'

export type Option = { label: string, value: string }

export const toOption = ({ name }: { name: string }) =>
  ({ label: name, value: name })

const getValue = (event: React.SyntheticEvent) =>
  event.currentTarget.getAttribute('data-value')

type Props = {
  options: Option[]
  selected: Option
  onChange: (value: string) => void
  isOpen: boolean
  toggleOpen: () => void
  focused?: Option
  onItemActive?: (value: string | null) => void
  className?: string
  children?: (item: Option) => React.ReactNode
}
/**
 * Component and styles adapted from
 * https://github.com/dbilgili/Custom-ReactJS-Dropdown-Components
 */
const Dropdown: React.FC<Props> = (props) => {
  const removeClickListener = () =>
    window.removeEventListener('click', collapseList)
  const collapseList = () => props.isOpen && props.toggleOpen()

  useEffect(() => {
    if (props.isOpen) {
      window.addEventListener('click', collapseList)
    } else {
      removeClickListener()
    }
    return removeClickListener
  })

  return <>
    <div className="selected" onClick={props.toggleOpen}>
      <div className="selected-value">{props.selected.label}</div>
      <ArrowDropDown/>
    </div>
    {props.isOpen &&
    <ul className="options" onClick={stopEvent}>
      {props.options.map(item => {
        const { value } = item
        const classes = []
        if (value === props.selected.value) {
          classes.push('selected-item')
        }
        if (props.focused && props.focused.value === value) {
          classes.push('focused-item')
        }
        return <li key={value}
                   className={classes.join(' ')}
                   data-value={value}
                   onMouseMove={event =>
                     props.onItemActive && props.onItemActive(getValue(event))}
                   onMouseOut={() =>
                     props.onItemActive && props.onItemActive(null)}
                   onClick={event => {
                     collapseList()
                     props.onChange(getValue(event))
                   }}>
          {props.children ? props.children(item) : item.label}
        </li>
      })}
    </ul>}
  </>
}

export default Dropdown
import * as React from 'react'
import { useEffect, useState } from 'react'
import { ArrowDropDown } from '@material-ui/icons'
import { stopEvent } from '../../utils'

import './Dropdown.scss'

type Option = { label: string, value: string }

export const toOption = ({ name }: { name: string }) =>
  ({ label: name, value: name })

type Props = {
  options: Option[]
  selected: Option
  onChange: (value: string) => void
  className?: string
  children?: (item: Option) => React.ReactNode
}
/**
 * Component and styles adapted from
 * https://github.com/dbilgili/Custom-ReactJS-Dropdown-Components
 */
const Dropdown: React.FC<Props> = (props) => {
  const [ isOpen, setIsOpen ] = useState(false)
  const removeClickListener = () =>
    window.removeEventListener('click', collapseList)
  const collapseList = () => isOpen && setIsOpen(false)

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('click', collapseList)
    } else {
      removeClickListener()
    }
    return removeClickListener
  })

  return <>
    <div className="selected" onClick={() => setIsOpen(current => !current)}>
      <div className="selected-value">{props.selected.label}</div>
      <ArrowDropDown/>
    </div>
    {isOpen &&
    <ul className="options" onClick={stopEvent}>
      {props.options.map(item => {
        const { value } = item
        return <li key={value}
                   className={value === props.selected.value && 'selected-item' || ''}
                   data-value={value}
                   onClick={({ currentTarget }) => {
                     collapseList()
                     props.onChange(currentTarget.getAttribute('data-value'))
                   }}>
          {props.children ? props.children(item) : item.label}
        </li>
      })}
    </ul>}
  </>
}

export default Dropdown
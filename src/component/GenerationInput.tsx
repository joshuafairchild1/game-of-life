import * as React from 'react'
import Input from '@material-ui/core/Input/Input'

import { CheckCircle } from '@material-ui/icons'
import keyEventHandler, { isNumber } from '../utils'
import { useRef } from 'react'
import { useState } from 'react'

type Props = {
  onSubmit: (nextValue: number) => void
  currentGenerationIndex: number
}

const GenerationInput: React.FC<Props> = props => {
  const [ editValue, setEditValue ] = useState(props.currentGenerationIndex.toString())
  const [ isEditing, setIsEditing ] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const handleEscape = keyEventHandler('Escape', () => {
    setIsEditing(false)
    props.onSubmit(props.currentGenerationIndex)
  })
  const startEdit = () => {
    setIsEditing(true)
    // capture the new value if it has changed since last edit
    const currentGeneration = props.currentGenerationIndex.toString()
    if (currentGeneration !== editValue) {
      setEditValue(currentGeneration)
    }
    setTimeout(() => {
      const input = inputRef && inputRef.current
      if (input) {
        input.focus()
        input.select()
      }
    })
  }
  const finishEdit = (event: React.SyntheticEvent<any>) => {
    event.preventDefault()
    const asNumber = parseInt(editValue)
    if (isNumber(asNumber)) {
      setIsEditing(false)
      props.onSubmit(asNumber)
    }
  }
  return isEditing
    ? <form className="control-generation-edit" onSubmit={finishEdit}>
        <Input type="number"
               inputProps={{ min: 0 }}
               inputRef={inputRef}
               value={editValue}
               onKeyUp={handleEscape}
               onChange={event => setEditValue(event.target.value)}/>
        <CheckCircle className="icon-check" onClick={finishEdit}/>
      </form>
    : <span title="Edit" onClick={startEdit}
            className="control-generation-editable">
        {props.currentGenerationIndex}
      </span>
}

export default GenerationInput
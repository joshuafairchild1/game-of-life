import * as React from 'react'
import Input from '@material-ui/core/Input/Input'
import useAppState from '../state/useAppState'
import CheckCircle from '@material-ui/icons/CheckCircle'
import Key from '../Key'
import { handlerFor, isNumber } from '../utils'
import { useState } from 'react'

import './GenerationInput.scss'

type Props = {
  onSubmit: (nextValue: number) => void
  currentGenerationIndex: number
}

const GenerationInput: React.FC<Props> = props => {
  const [ value, setValue ] = useState(props.currentGenerationIndex.toString())
  const { showGenerationInput } = useAppState('showGenerationInput')
  const escapeHandler = handlerFor(Key.Escape, () => {
    showGenerationInput.set(false)
    props.onSubmit(props.currentGenerationIndex)
  })
  const startEdit = () => {
    showGenerationInput.set(true)
    // capture the new value if it has changed since last edit
    const currentGeneration = props.currentGenerationIndex.toString()
    if (currentGeneration !== value) {
      setValue(currentGeneration)
    }
  }
  const finishEdit = (event: React.SyntheticEvent<any>) => {
    event.preventDefault()
    const asNumber = parseInt(value)
    if (isNumber(asNumber)) {
      showGenerationInput.set(false)
      props.onSubmit(asNumber)
    }
  }
  return showGenerationInput.get()
    ? <form className="control-generation-edit" onSubmit={finishEdit}>
        <Input type="number" autoFocus
               inputProps={{ min: 0 }}
               value={value}
               onKeyUp={escapeHandler.handle}
               onChange={event => setValue(event.target.value)}/>
        <CheckCircle className="icon-check" onClick={finishEdit}/>
      </form>
    : <span title="Edit" onClick={startEdit}
            className="control-generation-editable">
        {props.currentGenerationIndex}
      </span>
}

export default GenerationInput
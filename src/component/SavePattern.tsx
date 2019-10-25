import * as React from 'react'
import Close from '@material-ui/icons/Close'
import Save from '@material-ui/icons/Save'
import Pattern from '../game/Pattern'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Input from '@material-ui/core/Input'
import Modal from '@material-ui/core/Modal'
import useStateVariable from '../state/useStateVariable'
import KeyDownListener from './KeyDownListener'
import { useState } from 'react'
import { handlerFor } from '../utils'

import './SavePatternIcon.scss'

type Props = {
  onSave: (patternName: string) => void
}

const isUniqueName = (name: string) =>
  Pattern.known.every(it => it.name !== name)

const SavePattern: React.FC<Props> = props => {
  const [ patternName, setPatternName ] = useState('')
  const showModal = useStateVariable('showSavePatternModal')
  const hideModal = () => showModal.set(false)
  const isUnique = isUniqueName(patternName)
  const isValid = patternName.trim() !== ''
  const disabled = !isUnique || !isValid

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    if (patternName && isUniqueName(patternName)) {
      props.onSave(patternName)
      closeAndReset()
    }
  }

  function closeAndReset() {
    hideModal()
    setPatternName('')
  }

  function selectErrorText() {
    if (!isUnique) {
      return 'A pattern with this name already exists'
    }
    if (!isValid) {
      return 'Name must not be empty'
    }
    return null
  }

  const errorText = selectErrorText()

  return <KeyDownListener handlers={[ handlerFor('Escape', closeAndReset) ]}>
    <Save className="save-icon"
          titleAccess="Save Pattern"
          onClick={() => showModal.set(true)}/>
    <Modal onEscapeKeyDown={closeAndReset}
           style={{ textAlign: 'center' }}
           open={showModal.get()}>
      <Card className="save-pattern-dialog">
        <span className="close-icon">
          <Close onClick={closeAndReset}/>
        </span>
        <label>Pattern Name</label>
        <form onSubmit={handleSubmit}>
          <Input value={patternName} autoFocus
                 onChange={event => setPatternName(event.target.value)}/>
          <Button disabled={disabled}
                  onClick={handleSubmit}>Save</Button>
        </form>
        {errorText &&
        <small className="warn-text">
          {errorText}
        </small>}
      </Card>
    </Modal>
  </KeyDownListener>
}

export default SavePattern
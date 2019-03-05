import * as React from 'react'
import Close from '@material-ui/icons/Close'
import Save from '@material-ui/icons/Save'
import Pattern from '../game/Pattern'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Input from '@material-ui/core/Input'
import Modal from '@material-ui/core/Modal'
import useStateVariable from '../state/useStateVariable'
import { useState } from 'react'

import './SavePatternIcon.scss'

type Props = {
  onSave: (patternName: string) => void
}

const isUniqueName = (name: string) =>
  Pattern.known.every(it => it.name !== name)

const SavePatternIcon: React.FC<Props> = props => {
  const [ patternName, setPatternName ] = useState('')
  const showModal = useStateVariable('showSavePatternModal')
  const hideModal = () => showModal.set(false)
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (patternName && isUniqueName(patternName)) {
      hideModal()
      props.onSave(patternName)
      setPatternName('')
    }
  }
  const isUnique = isUniqueName(patternName)
  const isValid = patternName.trim() !== ''
  const disabled = !isUnique || !isValid
  return <>
    <Save className="save-icon"
          titleAccess="Save Pattern"
          onClick={() => showModal.set(true)}/>
    <Modal onEscapeKeyDown={hideModal}
           style={{ textAlign: 'center' }}
           open={showModal.get()}>
      <Card className="save-pattern-dialog">
        <span className="close-icon">
          <Close onClick={hideModal}/>
        </span>
        <label>Pattern Name</label>
        <form onSubmit={handleSubmit}>
          <Input value={patternName} autoFocus
                 onChange={event => setPatternName(event.target.value)}/>
          <Button disabled={disabled}
                  onClick={handleSubmit}>Save</Button>
        </form>
        {!isUnique &&
        <small className="warn-text">
          A pattern with this name already exists
        </small>}
        {!isValid &&
        <small className="warn-text">
          Name must not be empty
        </small>}
      </Card>
    </Modal>
  </>
}

export default SavePatternIcon
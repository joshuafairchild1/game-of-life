import * as React from 'react'
import { useState } from 'react'
import { Close, Save } from '@material-ui/icons'
import { Button, Card, Input, Modal } from '@material-ui/core'
import Pattern from '../game/Pattern'

import './SaveCurrentPattern.scss'

type Props = {
  modalOpen: boolean
  setModalOpen: (isOpen: boolean) => void
  onSave: (patternName: string) => void
}

const isUniqueName = (name: string) =>
  Pattern.known.every(it => it.name !== name)

const SaveCurrentPattern: React.FC<Props> = props => {
  const [ patternName, setPatternName ] = useState('')
  const hideModal = () => props.setModalOpen(false)
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (patternName && isUniqueName(patternName)) {
      hideModal()
      props.onSave(patternName)
      setPatternName('')
    }
  }
  const isUnique = isUniqueName(patternName)
  const disabled = !isUnique || !patternName
  return <>
    <Save className="save-icon"
          titleAccess="Save Pattern"
          onClick={() => props.setModalOpen(true)}/>
    <Modal onEscapeKeyDown={hideModal}
           style={{ textAlign: 'center' }}
           open={props.modalOpen}>
      <Card className="save-pattern-dialog">
        <span className="close-icon">
          <Close onClick={hideModal}/>
        </span>
        <label>Pattern Name</label>
        <form onSubmit={handleSubmit}>
          <Input value={patternName}
                 inputRef={ref => ref && ref.focus()}
                 onChange={event => setPatternName(event.target.value)}/>
          <Button disabled={disabled}
                  onClick={handleSubmit}>Save</Button>
        </form>
        {!isUnique &&
        <small className="warn-text">
          A pattern with this name already exists
        </small>}
      </Card>
    </Modal>
  </>
}

export default SaveCurrentPattern
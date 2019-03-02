import * as React from 'react'
import { useState } from 'react'
import { Close, Save } from '@material-ui/icons'
import { Button, Card, Input, Modal } from '@material-ui/core'
import Pattern from '../game/Pattern'
import useStateVariable from '../state/useStateVariable'

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
  const disabled = !isUnique || !patternName
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

export default SavePatternIcon
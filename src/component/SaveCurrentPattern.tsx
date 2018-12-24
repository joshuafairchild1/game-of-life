import * as React from 'react'
import { useState } from 'react'
import { Save } from '@material-ui/icons'
import { Button, Card, Input, Modal } from '@material-ui/core'
import Pattern from '../game/Pattern'

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
  return <>
    <Save className="save-icon"
          titleAccess="Save Pattern"
          onClick={() => props.setModalOpen(true)}>
      Save
    </Save>
    <Modal onEscapeKeyDown={hideModal}
           style={{ textAlign: 'center' }}
           open={props.modalOpen}>
      <Card className="save-pattern-dialog">
        <label>Pattern Name</label>
        <form onSubmit={event => {
          event.preventDefault()
          if (patternName && isUniqueName(patternName)) {
            hideModal()
            props.onSave(patternName)
            setPatternName('')
          }
        }}>
          <Input value={patternName}
                 onChange={event => setPatternName(event.target.value)}/>
          <Button>Save</Button>
        </form>
        {!isUniqueName(patternName) &&
        <small className="warn-text">
          A pattern with this name already exists
        </small>}
      </Card>
    </Modal>
  </>
}
export default SaveCurrentPattern
import * as React from 'react'
import { Save } from '@material-ui/icons'
import { useState } from 'react'
import { Button, Card, Input, Modal } from '@material-ui/core'

type Props = {
  modalOpen: boolean
  setModalOpen: (isOpen: boolean) => void
  onSave: (patternName: string) => void
}

// TODO: simple form validation, ensure unique pattern names

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
          if (patternName) {
            hideModal()
            props.onSave(patternName)
            setPatternName('')
          }
        }}>
          <Input value={patternName}
                 onChange={event => setPatternName(event.target.value)}/>
          <Button>Save</Button>
        </form>
      </Card>
    </Modal>
  </>
}
export default SaveCurrentPattern
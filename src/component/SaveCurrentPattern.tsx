import * as React from 'react'

type Props = {
  onSave: () => void
}

const SaveCurrentPattern: React.FC<Props> = props => {
  return <button onClick={() => props.onSave()}>
    Save
  </button>
}

export default SaveCurrentPattern
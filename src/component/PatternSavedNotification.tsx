import * as React from 'react'
import { IconButton, Snackbar } from '@material-ui/core'
import { Close } from '@material-ui/icons'

type Props = {
  isShowing: boolean
  hide: () => void
  patternName: string | undefined
}

const PatternSavedNotification: React.FC<Props> = props => {
  if (props.isShowing && !props.patternName) {
    console.warn(
      'bug: notification state set to open with no pattern available')
    return null
  }
  return <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    open={props.isShowing}
    onClose={props.hide}
    autoHideDuration={4000}
    message={<span>Saved pattern "{props.patternName}"</span>}
    action={[
      <IconButton
        key="close"
        aria-label="Close"
        onClick={props.hide}
      ><Close style={{ color: 'white' }}/></IconButton>
    ]}
  />
}

export default PatternSavedNotification
import * as React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import Close from '@material-ui/icons/Close'
import useAppState from '../state/useAppState'

const PatternSavedNotification: React.FC = () => {
  const {
    recentlySavedPattern, showPatternSaveNotification,
  } = useAppState('recentlySavedPattern', 'showPatternSaveNotification')
  const pattern = recentlySavedPattern.get()
  const isShowing = showPatternSaveNotification.get()
  if (!isShowing || (!pattern || !pattern.name)) {
    return null
  }
  function hideNotification() {
    showPatternSaveNotification.set(false)
    recentlySavedPattern.set(null)
  }
  return <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    open={isShowing}
    onClose={hideNotification}
    autoHideDuration={4000}
    message={<span>Saved pattern "{pattern.name}"</span>}
    action={[
      <IconButton
        key="close"
        aria-label="Close"
        onClick={hideNotification}
      ><Close style={{ color: 'white' }}/></IconButton>
    ]}
  />
}

export default PatternSavedNotification
import useAppState from '../../state/useAppState'
import useAutoFocusContainer from './useAutoFocusContainer'
import values from '../../state/values'

export default function useAppContainerFocus() {
  const {
    patternPickerOpen, showSavePatternModal, showGenerationInput
  } = values(useAppState('patternPickerOpen', 'showSavePatternModal', 'showGenerationInput'))

  return useAutoFocusContainer(
    () => !patternPickerOpen && !showSavePatternModal && !showGenerationInput,
    [ patternPickerOpen, showSavePatternModal, showGenerationInput ]
  )
}
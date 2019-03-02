import saveKeyHandler from '../saveKeyHandler'
import useAppState from '../state/useAppState'
import { Game } from './useGame'
import { KeyEventHandler } from '../../Types'

export default function useGlobalHotKeys(game: Game) {
  const {
    showSavePatternModal, patternPickerOpen
  } = useAppState('showSavePatternModal', 'patternPickerOpen')
  const setPatternModalOpen = (isOpen: boolean) => {
    if (isOpen) {
      game.pause()
    }
    showSavePatternModal.set(isOpen)
  }
  return <KeyEventHandler<HTMLDivElement>[]>[ {
    keyName: 's',
    onKeyDown: saveKeyHandler(() => setPatternModalOpen(true))
  }, {
    keyName: ' ', onKeyDown: game.togglePlaying
  }, {
    keyName: 'p',
    onKeyDown: event => (event.ctrlKey || event.metaKey)
      && patternPickerOpen.set(true)
  }]
}
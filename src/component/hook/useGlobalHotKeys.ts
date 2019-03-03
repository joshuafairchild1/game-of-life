import useAppState from '../../state/useAppState'
import { Game } from './useGame'
import { KeyEventHandler } from '../../Types'

export default function useGlobalHotKeys(game: Game) {
  const {
    showSavePatternModal, patternPickerOpen
  } = useAppState('showSavePatternModal', 'patternPickerOpen')

  const setSaveModalOpen = (isOpen: boolean) => {
    if (isOpen) {
      game.pause()
    }
    showSavePatternModal.set(isOpen)
  }

  return <KeyEventHandler<HTMLDivElement>[]>[{
    keyName: 's',
    onKeyDown: () => setSaveModalOpen(true)
  }, {
    keyName: ' ',
    onKeyDown: game.togglePlaying
  }, {
    keyName: 'p',
    onKeyDown: () => patternPickerOpen.set(isOpen => !isOpen)
  }]
}
import useAppState from '../../state/useAppState'
import Key from '../../Key'
import { Game } from './useGame'
import { handlerFor } from '../../utils'

export default function useGlobalHotKeys(game: Game) {
  const {
    showSavePatternModal, patternPickerOpen, showGenerationInput
  } = useAppState('showSavePatternModal', 'patternPickerOpen', 'showGenerationInput')

  const openSaveModal = () => {
    game.pause()
    showSavePatternModal.set(true)
  }

  return [
    handlerFor(Key.G, () => showGenerationInput.set(isOpen => !isOpen)),
    handlerFor(Key.P, () => patternPickerOpen.set(isOpen => !isOpen)),
    handlerFor(Key.R, event => !event.metaKey && game.reset()),
    handlerFor(Key.S, openSaveModal),
    handlerFor(Key.Spacebar, game.togglePlaying)
  ]
}
import ContextWrapper from '../../ContextWrapper'

export default function useCanvasContext(context: ContextWrapper | null) {
  return function withContext(action: (context: ContextWrapper) => void) {
    context !== null && action(context)
  }
}
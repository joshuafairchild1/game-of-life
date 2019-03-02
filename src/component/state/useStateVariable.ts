import AppState from './AppState'
import useAppState from './useAppState'

export default function useStateVariable<K extends keyof AppState>(stateKey: K) {
  return useAppState(stateKey)[stateKey]
}


import { useGlobal } from 'reactn'
import { StateSelection, StateFieldType, StateKey, StateVariableSelection } from './Types'

export default function useAppState<K extends StateKey>(...stateKeys: K[]) {
  const [ state, setAppState ] = useGlobal()
  const selection = {} as StateVariableSelection<K>
  if (stateKeys.length === 0) {
    stateKeys = Object.getOwnPropertyNames(state) as K[]
  }
  for (const key of stateKeys) {
    const setStateValue = (value: StateFieldType<K>) =>
      setAppState(current => ({ ...current, [key]: value }))
    selection[key] = {
      get: () => state[key],
      set: setStateValue
    }
  }
  return selection
}

export function values<K extends StateKey>(
  selection: StateVariableSelection<K>
) {
  const rawState = {} as StateSelection<K>
  for (const key in selection) {
    rawState[key] = selection[key].get()
  }
  return rawState
}
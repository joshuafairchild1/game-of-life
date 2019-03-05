import useGlobalAppState from './useGlobalAppState'
import {
  StateKey,
  StateVariableSelection,
  StateFieldType,
  AppStateSetter
} from './Types'
import { SetStateAction } from 'react'
import { ownKeys } from '../utils'

export default function useAppState<K extends StateKey>(...stateKeys: K[]) {
  const [ state, setAppState ] = useGlobalAppState()
  const selection = {} as StateVariableSelection<K>
  if (stateKeys.length === 0) {
    stateKeys = ownKeys(state)
  }
  for (const key of stateKeys) {
    selection[key] = {
      get: () => state[key],
      set: _useStateSetter(key, setAppState)
    }
  }
  return selection
}

function _useStateSetter<K extends StateKey>(
  key: K, setAppState: AppStateSetter
) {
  return function setStateValue(value: SetStateAction<StateFieldType<K>>) {
    setAppState(current => ({
      ...current,
      [key]: typeof value === 'function'
        ? value(current[ key ]) : value
    }))
  }
}
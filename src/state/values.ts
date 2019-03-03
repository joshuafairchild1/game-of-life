import { StateKey, StateSelection, StateVariableSelection } from './Types'

export default function values<K extends StateKey>(
  selection: StateVariableSelection<K>
) {
  const rawState = {} as StateSelection<K>
  for (const key in selection) {
    rawState[key] = selection[ key ].get()
  }
  return rawState
}
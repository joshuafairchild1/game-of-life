import { useGlobal } from 'reactn'
import AppState from './AppState'
import { AppStateSetter } from './Types'

/**
 * Should be the only place where [useGlobal] is called
 */
export default function useGlobalAppState() {
  return useGlobal() as [ AppState, AppStateSetter ]
}
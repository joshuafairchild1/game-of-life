import AppState from './AppState'
import { setGlobal } from 'reactn'

export default function initializeState(
  color: string, cellCount: number, interval: number
) {
  setGlobal(new AppState(color, cellCount, interval))
}
import Pattern from '../game/Pattern'
import patterns from '../game/patterns'

export default class AppState {
  constructor(
    readonly color: string,
    readonly cellCount: number,
    readonly renderInterval: number
  ) {}

  readonly showSavePatternModal: boolean = false
  readonly showPatternSaveNotification: boolean = false
  readonly patternPickerOpen: boolean = false
  readonly selectedPattern: Pattern = patterns.Custom01
  readonly recentlySavedPattern: Pattern | null = null
}
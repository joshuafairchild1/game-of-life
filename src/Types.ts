import Grid from './game/Grid'
import { KeyEvent } from './utils'

export type Coordinate = [ number, number ]

export type Rules = (current: Grid) => Grid

// might be useful later
// export type extractConfigurationType<Type> =
//   Type extends DynamicConfiguration<infer X> ? X : null

export interface KeyEventHandler<T> {
  keyName: string
  onKeyDown: (event: KeyEvent<T>) => void
}
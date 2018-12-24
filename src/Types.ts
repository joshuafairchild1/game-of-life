import Grid from './game/Grid'
import { KeyEvent } from './utils'

export type Coordinate = [ number, number ]

export type Rules = (current: Grid) => Grid

export interface DynamicConfiguration<T> {
  get(): T,
  set(value: T): void
}

export type KeyEventHandler<T> = {
  keyName: string
  onKeyDown: (event: KeyEvent<T>) => void
}
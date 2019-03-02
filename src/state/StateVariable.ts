import { SetStateAction } from 'react'

interface StateVariable<T> {
  get(): T
  set(value: SetStateAction<T>): void
}

export default StateVariable
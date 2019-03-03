import AppState from './AppState'
import StateVariable from './StateVariable'

type NewAppState = AppState | void | Promise<void>

export type AppStateSetter = (
  state: AppState | ((state: AppState) => NewAppState)
) => NewAppState

/**
 * Union of all string keys of the state object
 */
export type StateKey = keyof AppState

/**
 * Helper type to map StateKey [K] to the type of the value(s) that are
 * assigned to it on the state object
 */
export type StateFieldType<K extends StateKey> = Pick<AppState, K>[K]

/**
 * Converts a StateKey [Keys] type to a type representing an object
 * which contains all keys of [Keys], with each key's value being
 * a StateVariable of the type assigned to the key on the state object
 *
 * e.g.
 *
 * StateVariableSelection<'color' | 'cellCount'>
 *   Would map to:
 * { color: StateVariable<string>, cellCount: StateVariable<number> }
 */
export type StateVariableSelection<Keys extends StateKey> = {
  [K in Keys]: StateVariable<StateFieldType<K>>
}

/**
 * Mapped type similar to StateVariableSelection, with the difference being that
 * the mapped key value represents the *actual* type of the field rather than
 * a StateVariable of type of the field
 */
export type StateSelection<Keys extends StateKey> = {
  [K in Keys]: StateFieldType<K>
}
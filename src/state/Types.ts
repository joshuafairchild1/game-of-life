import AppState from './AppState'
import StateVariable from './StateVariable'

/**
 * Union of one more more string keys of the state object
 */
export type StateKey = keyof AppState

/**
 * Helper type to map a StateKey [PK] to the type of the value that is
 * assigned to it on the state object
 */
export type StateFieldType<PK extends StateKey, K extends PK = PK> = Pick<AppState, PK>[K]

/**
 * Mapped type which converts a StateKey [PK] to the type representing an object
 * which contains all keys of [PK], with each key's value being
 * a StateVariable of the type assigned to the key on the state object
 *
 * e.g.
 *
 * StateVariableSelection<'color', 'cellCount'>
 *   Would map to:
 * { color: StateVariable<string>, cellCount: StateVariable<number> }
 */
export type StateVariableSelection<PK extends StateKey> = {
  [K in PK]: StateVariable<StateFieldType<PK, K>>
}

/**
 * Mapped type similar to StateVariableSelection, with the difference being that
 * the mapped key value represents the actual type of the field rather than
 * a StateVariable of the field type
 */
export type StateSelection<PK extends StateKey> = {
  [K in PK]: StateFieldType<PK, K>
}
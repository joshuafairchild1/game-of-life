import Pattern from './game/Pattern'

export default function parseStoredPatterns(stored: any) {
  if (!Array.isArray(stored)) {
    throw Error('expected a list of pattern-like objects, was: ' + JSON.stringify(stored))
  }
  return stored.map(Pattern.parse)
}
import LocalStorageItem from './LocalStorageItem'
import Pattern from './game/Pattern'

export default class PatternStorage {

  constructor(
    private readonly patterns: LocalStorageItem<Pattern[]>
  ) {}

  get stored() {
    const patterns = this.patterns.get() || []
    Object.freeze(patterns)
    return patterns
  }

  save(pattern: Pattern) {
    this.patterns.set([ ...this.stored, pattern ])
  }

  delete(pattern: Pattern) {
    this.patterns.set(this.stored.filter(it => it.name !== pattern.name))
    Pattern.delete(pattern)
  }

}
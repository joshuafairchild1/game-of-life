import { Coordinate } from '../Types'

export default class Pattern {

  constructor(
    public readonly name: string,
    private readonly coordinates: Coordinate[],
    public readonly canDelete: boolean = true
  ) {
    Pattern.register(this)
  }

  has(x: number, y: number) {
    return !!this.coordinates.find(it => it[0] === x && it[1] === y)
  }

  static get known(): Readonly<Pattern[]> {
    const list = Array.from(Pattern.registry.values())
    Object.freeze(list)
    return list
  }

  static parse(maybePattern: any): Pattern {
    if (!Pattern.is(maybePattern)) {
      throw Error('cannot parse as pattern: ' + JSON.stringify(maybePattern))
    }
    // constructing the pattern will immediately register it
    return new Pattern(maybePattern.name, maybePattern.coordinates)
  }

  static is(maybePattern: any): maybePattern is Pattern {
    const asPattern = maybePattern as Pattern
    return asPattern
      && Array.isArray(asPattern.coordinates)
      && typeof asPattern.name === 'string'
  }

  static unregister(pattern: Pattern) {
    Pattern.registry.delete(pattern.name)
  }

  static forName(name: string) {
    const pattern = Pattern.registry.get(name)
    if (!pattern) {
      throw Error(`no pattern with name: ${name}`)
    }
    return pattern
  }

  private static register(pattern: Pattern) {
    Pattern.registry.set(pattern.name, pattern)
  }

  private static registry = new Map<string, Pattern>()

}
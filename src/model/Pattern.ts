import { Coordinate } from '../Types'

export default class Pattern {

  constructor(
    public readonly name: string,
    private readonly coordinates: Coordinate[]
  ) {}

  has(x: number, y: number) {
    return !!this.coordinates.find(it => it[0] === x && it[1] === y)
  }

}
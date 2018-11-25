import Cell, { isAlive, Status } from './Cell'
import Pattern from './Pattern'
import { Coordinate } from '../Types'

/**
 *  (0, 0), (1, 0), (2, 0), (3, 0) ...
 *  (0, 1), (1, 1), (2, 1), (3, 1) ...
 *  (0, 2), (1, 2), (2, 2), (3, 2)
 *  (0, 3), (1, 3), (2, 3), (3, 3)
 *  ...
 *  ...
 */

let currentGridId = 0

export default class Grid {
  private constructor(private readonly grid: Array<Cell[]> = [], id?: number) {
    this.isWithinBounds = this.isWithinBounds.bind(this)
    this.id = id === undefined ? currentGridId++ : id
  }

  get length() {
    return this.grid.length
  }

  addColumn() {
    const column: Cell[] = []
    this.grid.push(column)
    return column
  }

  get(x: number, y: number): Cell {
    const column = this.getColumn(x)
    const cell = column[ y ]
    if (!cell) {
      throw Error(`no cell located at (${x}, ${y})`)
    }
    return cell
  }

  set(cell: Cell) {
    const column = this.getColumn(cell.x)
    column[ cell.y ] = cell
  }

  toggleCell(x: number, y: number) {
    const cell = this.get(x, y)
    const nextStatus = cell.status === Status.Alive
      ? Status.Dead : Status.Alive
    this.set(cell.copy(nextStatus))
    return nextStatus
  }

  forEach(predicate: (cell: Cell) => void) {
    for (let x = 0; x < this.grid.length; x++) {
      for (let y = 0; y < this.grid.length; y++) {
        const cell = this.get(x, y)
        predicate(cell)
      }
    }
  }

  countLivingNeighbors(cell: Cell) {
    return this.neighbors(cell).filter(isAlive).length
  }

  neighbors(cell: Cell): Cell[] {
    const { x, y } = cell
    const candidates = [
      [ x - 1, y - 1 ], // upper left
      [ x, y - 1 ], // upper center
      [ x + 1, y - 1 ], // upper right
      [ x - 1, y ], // center left
      [ x + 1, y ], // center right
      [ x - 1, y + 1 ], // lower left
      [ x, y + 1 ], // lower center
      [ x + 1, y + 1 ] // lower right
    ]
    return candidates
      .filter(this.isWithinBounds)
      .map(([ x, y ]) => this.get(x, y))
  }

  get copy() {
    return new Grid(this.grid, this.id)
  }

  private getColumn(index: number): Cell[] {
    const column = this.grid[ index ]
    if (!column) {
      throw Error(`no column indexed at ${index}`)
    }
    return column
  }

  private isWithinBounds([ x, y ]: Coordinate): boolean {
    const column = this.grid[ x ]
    return column && (column[ y ] instanceof Cell) || false
  }

  static createWithLength(length: number, pattern?: Pattern) {
    const grid = new Grid()
    for (let x = 0; x < length; x++) {
      const column = grid.addColumn()
      for (let y = 0; y < length; y++) {
        const isAlive = pattern && pattern.has(x, y)
        const cell = new Cell(x, y, isAlive ? Status.Alive : Status.Dead)
        column.push(cell)
      }
    }
    return grid
  }

  static resetIdCounter() {
    currentGridId = 1
  }

  readonly id: number
}
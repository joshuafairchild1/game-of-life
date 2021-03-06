import Status from '../Status'

export const isAlive = (cell: Cell) => cell.alive
export const dead = (cell: Cell) => cell.copy(Status.Dead)
export const alive = (cell: Cell) => cell.copy(Status.Alive)

export default class Cell {
  constructor(
    readonly x: number,
    readonly y: number,
    readonly status: Status
  ) {
    Object.freeze(this)
  }

  get alive() {
    return this.status === Status.Alive
  }

  toString() {
    return `(${this.x}, ${this.y}) [${this.status}]`
  }

  copy(status = this.status) {
    return new Cell(this.x, this.y, status)
  }
}

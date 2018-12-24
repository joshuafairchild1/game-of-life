'use strict'
import 'mocha'
import { assert } from 'chai'
import Cell from './model/Cell'
import Grid from './Grid'
import Status from './Status'
import Pattern from './Pattern'

describe('Grid', function() {

  let uut: Grid

  beforeEach(function () {
    uut = Grid.createWithLength(10, 0)
  })

  it('length', function () {
    assert.equal(uut.length, 10)
    uut['grid'].length = 0
    assert.equal(uut.length, 0)
  })

  it('get', function () {
    const cell = new Cell(0, 0, Status.Dead)
    uut.set(cell)
    const actual = uut.get(0, 0)
    assert.deepEqual(actual, cell)

    uut['grid'][1] = []
    uut['grid'][2] = null
    assert.throws(() => uut.get(1, 1), 'no cell located at')
    assert.throws(() => uut.get(2, 1), 'no column indexed at')
  })

  it('gets neighboring cells', function () {
    const targetCell = new Cell(5, 5, Status.Alive)
    const upperCenter = new Cell(5, 4, Status.Alive)
    uut.set(targetCell)
    uut.set(upperCenter)
    const [ upperLeft, lowerRight, ...others ] = [
      new Cell(6, 6, Status.Dead),
      new Cell(4, 4, Status.Dead),
      new Cell(6, 4, Status.Dead),
      new Cell(4, 5, Status.Dead),
      new Cell(6, 5, Status.Dead),
      new Cell(4, 6, Status.Dead),
      new Cell(5, 6, Status.Dead)
    ]
    const neighbors = uut.neighbors(targetCell)
    assert.deepEqual(
      neighbors,
      [ lowerRight, upperCenter, ...others, upperLeft ]
    )
  })

  it('toggleCell', function () {
    const cell = new Cell(0, 0, Status.Alive)
    uut.set(cell)
    uut.toggleCell(cell.x, cell.y)
    assert.isTrue(uut.get(cell.x, cell.y).status === Status.Dead)
    uut.toggleCell(cell.x, cell.y)
    assert.isTrue(uut.get(cell.x, cell.y).status === Status.Alive)
  })

  it('toPattern', function() {
    const patternName = 'pattern'
    const pattern = new Pattern(patternName, [ [ 0, 0 ], [ 0, 1 ] ])
    const withPattern = Grid.createWithLength(5, 0, pattern)
    assert.deepEqual(withPattern.toPattern(patternName), pattern)
  })

  it('ifDeadCell', function(done) {
    const deadCell = new Cell(0, 0, Status.Dead)
    const livingCell = new Cell(1, 0, Status.Alive)
    uut.set(deadCell)
    uut.set(livingCell)
    uut.ifDeadCell(livingCell.x, livingCell.y, () => {
      throw Error('test failed')
    })
    uut.ifDeadCell(deadCell.x, deadCell.y, done)
    throw Error('test failed')
  })

  it('copy', function() {
    const originalId = uut.id
    const copy = uut.copy
    ;(<any>uut)['id']++
    uut.set(new Cell(0, 0, Status.Alive))
    assert.equal(copy.id, originalId)
    assert.isFalse(copy.get(0, 0).alive)
  })

})
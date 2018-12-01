'use strict'

import 'mocha'
import { assert } from 'chai'
import Grid from './model/Grid'
import Cell, { Status } from './model/Cell'
import applyRules from './applyRules'

describe('applyRules', function() {

  let grid: Grid

  beforeEach(function () {
    grid = Grid.createWithLength(10, 0)
  })

  it('kills a cell with < 2 live neighbors', function () {
    const targetCell = new Cell(5, 5, Status.Alive)
    grid.set(targetCell)
    grid.set(new Cell(5, 4, Status.Dead))
    const newGrid = applyRules(grid)
    const updatedCell = newGrid.get(targetCell.x, targetCell.y)
    assert.isFalse(updatedCell.alive)
  })

  it('cell lives if there are 2 or 3 live neighbors', function f() {
    const targetCell = new Cell(5, 5, Status.Alive)
    grid.set(targetCell)
    grid.set(new Cell(5, 4, Status.Alive))
    grid.set(new Cell(5, 6, Status.Alive))
    const newGrid = applyRules(grid)
    const updatedCell = newGrid.get(targetCell.x, targetCell.y)
    assert.isTrue(updatedCell.alive)
  })

  it('cell dies if there are > 3 live neighbors', function () {
    const targetCell = new Cell(5, 5, Status.Alive)
    grid.set(targetCell)
    grid.set(new Cell(5, 4, Status.Alive))
    grid.set(new Cell(5, 6, Status.Alive))
    grid.set(new Cell(4, 5, Status.Alive))
    grid.set(new Cell(6, 5, Status.Alive))
    const newGrid = applyRules(grid)
    const updatedCell = newGrid.get(targetCell.x, targetCell.y)
    assert.isFalse(updatedCell.alive)
  })

  it('cell regenerates if there are exactly 3 living neighbors', function () {
    const targetCell = new Cell(5, 5, Status.Dead)
    grid.set(targetCell)
    grid.set(new Cell(5, 4, Status.Alive))
    grid.set(new Cell(5, 6, Status.Alive))
    grid.set(new Cell(4, 5, Status.Alive))
    const newGrid = applyRules(grid)
    const updatedCell = newGrid.get(targetCell.x, targetCell.y)
    assert.isTrue(updatedCell.alive)
  })

})
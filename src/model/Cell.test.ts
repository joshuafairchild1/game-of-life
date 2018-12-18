'use strict'

import 'mocha'
import { assert } from 'chai'
import Cell from './Cell'
import Status from '../Status'

describe('Cell', function() {

  it('alive', function () {
    const live = new Cell(0, 0, Status.Alive)
    const dead = new Cell(0, 0, Status.Dead)
    assert.isTrue(live.alive)
    assert.isFalse(dead.alive)
  })

  it('toString', function() {
    const live = new Cell(0, 0, Status.Alive)
    const dead = new Cell(0, 0, Status.Dead)
    assert.equal(live.toString(), '(0, 0) [1]')
    assert.equal(dead.toString(), '(0, 0) [0]')
  })

  it('copy', function () {
    const original = new Cell(0, 0, Status.Dead)
    const copy = original.copy(Status.Alive)
    assert.deepEqual(copy, { ...original, status: Status.Alive })
  })
})
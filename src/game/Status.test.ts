'use strict'

import 'mocha'
import { assert } from 'chai'
import Status from './Status'

describe('Status', function() {

  it('inverts status', function() {
    const alive = Status.Alive
    const inverted = Status.inverted(alive)
    assert.equal(inverted, Status.Dead)
    assert.equal(Status.inverted(inverted), Status.Alive)
  })

  it('casts a value to a Status', function() {
    assert.equal(Status.from(42), Status.Alive)
    assert.equal(Status.from(1), Status.Alive)
    assert.equal(Status.from('value'), Status.Alive)
    assert.equal(Status.from(true), Status.Alive)
    assert.equal(Status.from({}), Status.Alive)
    assert.equal(Status.from([]), Status.Alive)
    assert.equal(Status.from(Status.Alive), Status.Alive)

    assert.equal(Status.from(false), Status.Dead)
    assert.equal(Status.from(null), Status.Dead)
    assert.equal(Status.from(undefined), Status.Dead)
    assert.equal(Status.from(0), Status.Dead)
    assert.equal(Status.from(''), Status.Dead)
    assert.equal(Status.from('0'), Status.Dead)
    assert.equal(Status.from('false'), Status.Dead)
    assert.equal(Status.from(Status.Dead), Status.Dead)
  })
})
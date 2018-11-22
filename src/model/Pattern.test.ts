'use strict'

import 'mocha'
import { assert } from 'chai'

import Pattern from './Pattern'

describe('Pattern', function() {

  it('has', function() {
    const uut = new Pattern([ [ 0, 0], [ 1,2 ], [ 2, 4 ] ])
    assert.isTrue(uut.has(0, 0))
    assert.isTrue(uut.has(1, 2))
    assert.isTrue(uut.has(2, 4))
    assert.isFalse(uut.has(0, 1))
    assert.isFalse(uut.has(3, 1))
  })
})
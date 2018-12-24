'use strict'

import 'mocha'
import { assert } from 'chai'

import Pattern from './Pattern'
import { Coordinate } from './Types'

describe('Pattern', function() {

  beforeEach(() => {
    Pattern['registry'] = new Map()
  })

  it('has', function() {
    const uut = new Pattern('Test', [ [ 0, 0 ], [ 1, 2 ], [ 2, 4 ] ])
    assert.isTrue(uut.has(0, 0))
    assert.isTrue(uut.has(1, 2))
    assert.isTrue(uut.has(2, 4))
    assert.isFalse(uut.has(0, 1))
    assert.isFalse(uut.has(3, 1))
  })

  it('pattern registers itself when constructor is called', function() {
    const p1 = new Pattern('Pattern 1', [ [ 0, 1 ] ])
    const p2 = new Pattern('Pattern 2', [ [ 0, 2 ] ])
    assert.deepEqual(Pattern.known, [ p1, p2 ])
  })

  it('is', function() {
    const patternLike = { name: 'pattern', coordinates: [ [ 0, 0 ] ] }
    const notAPattern1 = {}
    const notAPattern2 = [ [ 1, 1 ] ]
    const notAPattern3 = { name: 'not pattern' }
    const notAPattern4 = { coordinates: [ [ 0, 0 ] ] }
    assert.isTrue(Pattern.is(patternLike))
    assert.isFalse(Pattern.is(notAPattern1))
    assert.isFalse(Pattern.is(notAPattern2))
    assert.isFalse(Pattern.is(notAPattern3))
    assert.isFalse(Pattern.is(notAPattern4))
  })

  it('parse', function() {
    const name = 'pattern'
    const coordinates: Coordinate[] = [ [ 0, 0 ], [ 0, 1] ]
    const patternLike = { name, coordinates }
    const notAPattern = {}
    const asPattern = new Pattern(name, coordinates)
    assert.deepEqual(Pattern.parse(patternLike), asPattern)
    assert.throws(() => Pattern.parse(notAPattern), 'cannot parse as pattern')
  })
})
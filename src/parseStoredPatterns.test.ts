'use strict'

import 'mocha'
import { assert } from 'chai'

import Pattern from './game/Pattern'
import parseStoredPatterns from './parseStoredPatterns'

describe('parseStoredPatterns', function() {

  it('parses a list of patterns from json', function() {
    const patterns = [
      new Pattern('pattern 1', [ [ 0, 1 ] ]),
      new Pattern('pattern 2', [ [ 0, 2 ] ]),
      new Pattern('pattern 3', [ [ 0, 3 ] ]),
    ]
    const stored = JSON.stringify(patterns)
    const json = JSON.parse(stored)
    const parsed = parseStoredPatterns(json)
    assert.deepEqual(parsed, patterns)
  })

})
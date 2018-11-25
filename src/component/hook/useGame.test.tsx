'use strict'

import * as React from 'react'
import { assert } from 'chai'
import 'mocha'
import { render } from 'react-testing-library'
import { instance, mock } from 'ts-mockito'

import Grid from '../../model/Grid'
import useGame from './useGame'

import { Rules } from '../../Types'
import Pattern from '../../model/Pattern'

type Props = {
  grid: Grid,
  rules: Rules,
  interval: number
}

const GameSubscriber: React.FC<Props> = props => {
  const game = useGame(
    new Pattern('Empty', []), 10,  props.rules, props.interval)
  return <span>{game.current}</span>
}

describe.skip('useGame', function() {
  let gridMock: Grid
  let grid: Grid

  beforeEach(() => {
    gridMock = mock(Grid)
    grid = instance(gridMock)
  })

  const rules = (grid: Grid) => grid

  it('generation starts at zero', function () {
    const interval = 20

    const { container } = render(
      <GameSubscriber
        grid={grid}
        rules={rules}
        interval={interval}/>
    )
    assert.equal(container.firstChild.textContent, '0')
  })

})
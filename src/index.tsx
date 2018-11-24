import * as ReactDOM from 'react-dom'
import * as React from 'react'

import App from './component/App'
import applyRules from './applyRules'
import CanvasConfig from './model/CanvasConfig'
import Grid from './model/Grid'
import patterns from './patterns'

import './global.scss'

const GENERATION_INTERVAL = 500
const LINE_WIDTH = 1
const config = new CanvasConfig(800, 18, LINE_WIDTH, LINE_WIDTH * 2.5)
const initialGrid = Grid.createWithLength(config.cellCount, patterns.Glider)

ReactDOM.render(
  <App rules={applyRules}
       grid={initialGrid}
       configuration={config}
       interval={GENERATION_INTERVAL}/>,
  document.getElementById('root')
)
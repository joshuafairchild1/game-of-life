import * as ReactDOM from 'react-dom'
import * as React from 'react'

import App from './component/App'
import applyRules from './applyRules'
import CanvasConfig from './model/CanvasConfig'
import patterns, { patternList } from './patterns'

import './global.scss'

const GENERATION_INTERVAL = 50
const LINE_WIDTH = 1
const config = new CanvasConfig(800, 13, LINE_WIDTH, LINE_WIDTH * 2)

ReactDOM.render(
  <App rules={applyRules}
       initialPattern={patterns.GosperGliderGun}
       presetPatterns={patternList}
       configuration={config}
       interval={GENERATION_INTERVAL}/>,
  document.getElementById('root')
)
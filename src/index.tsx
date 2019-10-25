import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './component/App'
import applyRules from './game/applyRules'
import CanvasConfig from './model/CanvasConfig'
import Pattern from './game/Pattern'
import LocalStorageItem from './LocalStorageItem'
import parseStoredPatterns from './parseStoredPatterns'
import PatternStorage from './PatternStorage'
import initializeState from './state/initializeState'

import './global.scss'

// https://material-ui.com/style/typography/#migration-to-typography-v2
(window as any).__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true

const GENERATION_INTERVAL = 125
const LINE_WIDTH = 1
const DEFAULT_PRIMARY_COLOR = '#1e87f0'
const config = new CanvasConfig(700, 18, LINE_WIDTH, DEFAULT_PRIMARY_COLOR)
const storedPatterns = new LocalStorageItem('STORED_PATTERNS', parseStoredPatterns)
// invoking the parsing strategy here so that stored
// patterns are loaded before the component tree mounts
storedPatterns.get()
const storage = new PatternStorage(storedPatterns)

initializeState(DEFAULT_PRIMARY_COLOR, config.cellCount, GENERATION_INTERVAL)

ReactDOM.render(
  <App rules={applyRules}
       presetPatterns={Pattern.known}
       configuration={config}
       interval={GENERATION_INTERVAL}
       storage={storage}/>,
  document.getElementById('root')
)
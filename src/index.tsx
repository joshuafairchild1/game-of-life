import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './component/App'
import applyRules from './game/applyRules'
import CanvasConfig from './component/model/CanvasConfig'
import Pattern from './game/Pattern'
import LocalStorageItem from './LocalStorageItem'
import patterns from './game/patterns'
import parseStoredPatterns from './parseStoredPatterns'

import './global.scss'
import PatternStorage from './PatternStorage'

// https://material-ui.com/style/typography/#migration-to-typography-v2
(window as any).__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true

const GENERATION_INTERVAL = 50
const LINE_WIDTH = 1
const DEFAULT_PRIMARY_COLOR = '#1e87f0'
const config = new CanvasConfig(700, 18, LINE_WIDTH, DEFAULT_PRIMARY_COLOR)
const storedPatterns =
  new LocalStorageItem<Pattern[]>('STORED_PATTERNS', parseStoredPatterns)
// invoking the parsing strategy here so that stored
// patterns are loaded before the component tree mounts
storedPatterns.get()
const storage = new PatternStorage(storedPatterns)

ReactDOM.render(
  <App rules={applyRules}
       initialPattern={patterns.Custom01}
       presetPatterns={Pattern.known}
       configuration={config}
       interval={GENERATION_INTERVAL}
       storage={storage}/>,
  document.getElementById('root')
)
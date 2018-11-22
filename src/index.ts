import applyRules from './applyRules'
import CanvasConfig from './model/CanvasConfig'
import ContextWrapper from './view/ContextWrapper'
import getCanvas from './view/getCanvas'
import Game from './Game'
import Grid from './model/Grid'
import GridRenderer from './view/GridRenderer'
import patterns from './patterns'

const GENERATION_INTERVAL = 500
const LINE_WIDTH = 1
const config = new CanvasConfig(1250, 18, LINE_WIDTH, LINE_WIDTH * 2.5)

const canvas = getCanvas(config.canvasLength)
const context = new ContextWrapper(canvas.getContext('2d'), config.lineWidth)
const grid = Grid.createWithLength(config.cellCount, patterns.TenHorizontal)
const renderer = new GridRenderer(config, context, canvas)
const game = new Game(renderer, grid, applyRules, GENERATION_INTERVAL)

game.begin()
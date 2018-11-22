import CanvasConfig from '../model/CanvasConfig'
import Grid from '../model/Grid'
import ContextWrapper from './ContextWrapper'

export default class GridRenderer {
  constructor(
    private readonly config: CanvasConfig,
    private readonly context: ContextWrapper,
    private readonly canvas: HTMLCanvasElement
  ) {}

  render(grid: Grid) {
    const { canvas: { height, width }, context } = this
    context.clear(height)
    context.withPath(() => {
      this.forEachCell((x, positionX) => {
        this.drawLines(positionX)
        this.forEachCell((y, positionY) => {
          const cell = grid.get(x, y)
          if (cell.alive) {
            this.drawCell(positionX, positionY)
          }
        })
      })
      context.draw(width, 0, width, height)
      context.draw(0, height, width, height)
    })
  }

  private drawLines(position: number) {
    const { width, height } = this.canvas
    this.context
      .draw(position, 0, position, height)
      .draw(0, position, width, position)
  }

  private drawCell(positionX: number, positionY: number) {
    const { context, config: { lineSeparation, border } } = this
    const borderX = positionX + border
    const borderY = positionY + border
    const borderLength = lineSeparation - (border * 2)
    context
      .fillSquare(positionX, positionY, lineSeparation, 'white')
      .fillSquare(borderX, borderY, borderLength, 'black')
  }

  private forEachCell(
    action: (position: number, cellIndex: number) => void
  ) {
    const { cellCount, lineSeparation } = this.config
    for (let index = 0; index < cellCount; index++) {
      try {
        action(index, index * lineSeparation)
      } catch (ex) {
        console.warn(
          'error invoking action at cell position', index)
      }
    }
  }
}
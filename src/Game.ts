import GridRenderer from './view/GridRenderer'
import Grid from './model/Grid'

export default class Game {
  constructor(
    private readonly renderer: GridRenderer,
    private grid: Grid,
    private readonly applyRules: (current: Grid) => Grid,
    private readonly interval: number
  ) {}

  begin() {
    this.timeout = setInterval(this.nextGeneration, this.interval)
  }

  private nextGeneration = () => {
    const { grid } = this
    try {
      const start = Date.now()
      this.renderer.render(grid)
      this.grid = this.applyRules(grid)
      console.log('took', Date.now() - start, 'ms to render generation', this.generation++)
    } catch (ex) {
      console.error('error transitioning to next generation', ex)
      clearInterval(this.timeout)
    }
  }


  private generation: number = 0
  private timeout: number | null = null
}

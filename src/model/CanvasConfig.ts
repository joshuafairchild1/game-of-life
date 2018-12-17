

export default class CanvasConfig {
  constructor(
    approximateLength: number,
    readonly lineSeparation: number,
    readonly lineWidth: number,
  ) {
    const cellCount = this.cellCount = Math.ceil(approximateLength / lineSeparation)
    this.canvasLength = cellCount * lineSeparation
  }

  readonly cellCount: number
  readonly canvasLength: number
}
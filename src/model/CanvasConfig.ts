

export default class CanvasConfig {
  constructor(
    readonly canvasLength: number,
    readonly lineSeparation: number,
    readonly lineWidth: number,
    readonly border: number,
  ) {
    this.cellCount = Math.floor(canvasLength / lineSeparation)
  }

  readonly cellCount: number
}
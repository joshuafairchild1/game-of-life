

export default class ContextWrapper {
  constructor(
    private readonly context: CanvasRenderingContext2D,
    lineWidth: number
  ) {
    context.lineWidth = lineWidth
  }

  withPath(action: () => void) {
    const { context } = this
    context.beginPath()
    action()
    context.closePath()
  }

  draw(startX: number, startY: number, endX: number, endY: number) {
    const { context } = this
    context.moveTo(startX, startY)
    context.lineTo(endX, endY)
    context.stroke()
    return this
  }

  fillSquare(posX: number, posY: number, length: number, color?: string) {
    const { context } = this
    const originalColor = context.fillStyle
    if (color) {
      context.fillStyle = color
    }
    context.fillRect(posX, posY, length, length)
    if (color) {
      context.fillStyle = originalColor
    }
    return this
  }

  clear(canvasLength: number) {
    this.context.clearRect(0, 0, canvasLength, canvasLength)
    return this
  }
}
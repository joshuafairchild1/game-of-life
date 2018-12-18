export default class ContextWrapper {
  constructor(
    private readonly context: CanvasRenderingContext2D,
    lineWidth: number
  ) {
    context.lineWidth = lineWidth
  }

  withPath(operation: () => void) {
    const { context } = this
    context.beginPath()
    operation()
    context.closePath()
  }

  withLineWidth(width: number, operation: () => void) {
    const { context } = this
    const original =  context.lineWidth
    context.lineWidth = width
    operation()
    context.lineWidth = original
  }

  draw = (startX: number, startY: number, endX: number, endY: number) => {
    const { context } = this
    context.moveTo(startX, startY)
    context.lineTo(endX, endY)
    context.stroke()
  }

  fillSquare = (posX: number, posY: number, length: number, color?: string) => {
    const { context } = this
    const originalColor = context.fillStyle
    if (color) {
      context.fillStyle = color
    }
    context.fillRect(posX, posY, length, length)
    if (color) {
      context.fillStyle = originalColor
    }
  }

  clear(canvasLength: number) {
    this.context.clearRect(0, 0, canvasLength, canvasLength)
  }
}
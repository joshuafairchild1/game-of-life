let existing: HTMLCanvasElement | null = null

const getCanvas = (length: number) => {
  if (existing) {
    return existing
  }
  const canvas = document.createElement('canvas')
  canvas.id = 'canvas'
  canvas.width = length
  canvas.height = length
  document.body.appendChild(canvas)
  return canvas && (existing = canvas)
}

export default getCanvas
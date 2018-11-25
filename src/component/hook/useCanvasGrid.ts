import Grid from '../../model/Grid'
import CanvasConfig from '../../model/CanvasConfig'
import { useMutationEffect } from 'react'
import useCanvas from './useCanvas'
import useCanvasContext from './useCanvasContext'

const BACKGROUND = '#eaeaea'

export default function useCanvasGrid(grid: Grid, config: CanvasConfig) {
  const { lineWidth, lineSeparation, canvasLength, border, cellCount } = config
  const { canvasRef, context } = useCanvas(lineWidth)
  const withContext = useCanvasContext(context)

  useMutationEffect(drawGrid)

  function drawGrid() {
    // const start = Date.now()
    withContext(context => {
      // console.log('drawing grid generation', grid.id)
      context.clear(canvasLength)
      context.withPath(() => {
        context.fillSquare(0, 0, canvasLength, BACKGROUND)
        forEachCell((x, positionX) => {
          drawLines(positionX)
          forEachCell((y, positionY) => {
            const cell = grid.get(x, y)
            if (cell.alive) {
              drawLivingCell(positionX, positionY)
            }
          })
        })
        context.draw(canvasLength, 0, canvasLength, canvasLength)
        context.draw(0, canvasLength, canvasLength, canvasLength)
      })
    })
    // console.debug('rendering grid took', Date.now() - start, 'ms')
  }

  function drawLines(position: number) {
    withContext(({ draw }) => {
      draw(position, 0, position, canvasLength)
      draw(0, position, canvasLength, position)
    })
  }

  function drawLivingCell(positionX: number, positionY: number) {
    withContext(({ fillSquare }) => {
      const borderX = positionX + border
      const borderY = positionY + border
      const borderLength = lineSeparation - (border * 2)
      fillSquare(positionX, positionY, lineSeparation, BACKGROUND)
      fillSquare(borderX, borderY, borderLength, 'black')
    })
  }

  function forEachCell(
    action: (position: number, cellIndex: number) => void
  ) {
    for (let index = 0; index < cellCount; index++) {
      try {
        action(index, index * lineSeparation)
      } catch (ex) {
        console.warn(
          'error invoking action at cell position', index, ex)
      }
    }
  }

  return canvasRef
}
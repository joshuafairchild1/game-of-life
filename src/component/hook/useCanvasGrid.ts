import Grid from '../../model/Grid'
import CanvasConfig from '../../model/CanvasConfig'
import useCanvas from './useCanvas'
import useCanvasContext from './useCanvasContext'

import { useLayoutEffect } from 'react'
import { Coordinate } from '../../Types'
import { timed } from '../../utils'

const BACKGROUND = '#eaeaea'
// not sure why getting these values during useMutationEffect
// breaks highlighting, so using this for now
let currentHoveredCellPosition: Coordinate | null = null
const setHoveredCell = (next: Coordinate) => currentHoveredCellPosition = next

export default function useCanvasGrid(grid: Grid, config: CanvasConfig) {
  const { lineWidth, lineSeparation, canvasLength, border, cellCount } = config
  const { canvasRef, context } = useCanvas(lineWidth)
  const withContext = useCanvasContext(context)
  useLayoutEffect(() => timed('draw grid', drawGrid), [ grid ])
  const toCanvasPosition = (cellPosition: number) => cellPosition * lineSeparation

  function drawGrid() {
    withContext(context => {
      context.clear(canvasLength)
      context.withPath(() => {
        context.fillSquare(0, 0, canvasLength, BACKGROUND)
        forEachCell((x, positionX) => {
          drawLines(positionX)
          forEachCell((y, positionY) => {
            const cell = grid.get(x, y)
            if (cell.alive) {
              drawCell(positionX, positionY)
            }
          })
        })
        context.draw(canvasLength, 0, canvasLength, canvasLength)
        context.draw(0, canvasLength, canvasLength, canvasLength)
      })
    })
  }

  function drawLines(position: number) {
    withContext(({ draw }) => {
      draw(position, 0, position, canvasLength)
      draw(0, position, canvasLength, position)
    })
  }

  function drawCell(
    positionX: number, positionY: number,
    color = 'black', withBackground: boolean = true, withOutline: boolean = false
  ) {
    withContext(({ fillSquare, draw }) => {
      const borderX = positionX + border
      const borderY = positionY + border
      const borderLength = lineSeparation - (border * 2)
      if (withBackground) {
        fillSquare(positionX, positionY, lineSeparation, BACKGROUND)
        fillSquare(borderX, borderY, borderLength, color)
      } else {
        fillSquare(positionX, positionY, lineSeparation, color)
      }
      if (withOutline) {
        const xPlusOne = positionX + lineSeparation
        const yPlusOne = positionY + lineSeparation
        draw(positionX, positionY, xPlusOne, positionY)
        draw(xPlusOne, positionY, xPlusOne, yPlusOne)
        draw(xPlusOne, yPlusOne, positionX, yPlusOne)
        draw(positionX, yPlusOne, positionX, positionY)
      }
    })
  }

  function forEachCell(
    action: (position: number, cellIndex: number) => void
  ) {
    for (let cellIndex = 0; cellIndex < cellCount; cellIndex++) {
      try {
        action(cellIndex, toCanvasPosition(cellIndex))
      } catch (ex) {
        console.warn(
          'error invoking action at cell position', cellIndex, ex)
      }
    }
  }

  function highlightCell(cellX: number, cellY: number) {
    const posX = toCanvasPosition(cellX)
    const posY = toCanvasPosition(cellY)
    // fill in the current hovered cell before highlighting the next target
    if (currentHoveredCellPosition) {
      const [ hoveredX, hoveredY ] = currentHoveredCellPosition
      grid.ifDeadCell(hoveredX / lineSeparation, hoveredY / lineSeparation,
        () => drawCell(hoveredX, hoveredY, BACKGROUND, false, true))
    }
    grid.ifDeadCell(cellX, cellY, () => {
      drawCell(posX, posY, '#00d9d9', false, true)
      setHoveredCell([ posX, posY ])
      currentHoveredCellPosition = [ posX, posY ]
    })
  }

  return { canvasRef, highlightCell }
}
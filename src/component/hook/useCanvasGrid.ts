import CanvasConfig from '../../model/CanvasConfig'
import Grid from '../../model/Grid'
import useCanvas from './useCanvas'
import useCanvasContext from './useCanvasContext'

import { useLayoutEffect } from 'react'
import { Coordinate } from '../../Types'

const BACKGROUND_COLOR = '#eaeaea'
const HOVER_COLOR = '#a8a8a8'
const CELL_COLOR = '#018786'

// not sure why getting these values during useMutationEffect
// breaks highlighting, so using this for now
let currentHoveredCellPosition: Coordinate | null = null
const setHoveredCell = (next: Coordinate) => currentHoveredCellPosition = next

export default function useCanvasGrid(grid: Grid, config: CanvasConfig) {
  const { lineWidth, lineSeparation, canvasLength, cellCount } = config
  const { canvasRef, context } = useCanvas(lineWidth)
  const withContext = useCanvasContext(context)
  useLayoutEffect(drawGrid, [ grid ])
  const toCanvasPosition = (cellPosition: number) => cellPosition * lineSeparation
  const toCellPosition = (cellPosition: number) => cellPosition / lineSeparation

  function drawGrid() {
    withContext(context => {
      context.clear(canvasLength)
      context.withPath(() => {
        context.fillSquare(0, 0, canvasLength, BACKGROUND_COLOR)
        forEachCell((x, positionX) => {
          drawLines(positionX)
          forEachCell((y, positionY) => {
            const cell = grid.get(x, y)
            if (cell.alive) {
              drawCell(positionX, positionY)
            }
          })
        })
        if (currentHoveredCellPosition) {
          const [ posX, posY ] = currentHoveredCellPosition
          highlightCell(toCellPosition(posX), toCellPosition(posY))
        }
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
    color = CELL_COLOR,
    withOutline: boolean = false
  ) {
    withContext(({ fillSquare, draw }) => {
      fillSquare(positionX, positionY, lineSeparation, color)
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

  function highlightCell(cellX: number, cellY: number, color = HOVER_COLOR) {
    const posX = toCanvasPosition(cellX)
    const posY = toCanvasPosition(cellY)
    // fill in the current hovered cell before highlighting the next target
    if (currentHoveredCellPosition) {
      const [ hoveredX, hoveredY ] = currentHoveredCellPosition
      grid.ifDeadCell(toCellPosition(hoveredX), toCellPosition(hoveredY),
        () => drawCell(hoveredX, hoveredY, BACKGROUND_COLOR, true))
    }
    grid.ifDeadCell(cellX, cellY, () => {
      drawCell(posX, posY, color, true)
      setHoveredCell([ posX, posY ])
      currentHoveredCellPosition = [ posX, posY ]
    })
  }

  function unhighlightActiveCell() {
    if (currentHoveredCellPosition) {
      const [ x, y ] = currentHoveredCellPosition
      highlightCell(toCellPosition(x), toCellPosition(y), BACKGROUND_COLOR)
    }
    currentHoveredCellPosition = null
  }

  return { canvasRef, highlightCell, unhighlightActiveCell }
}
import CanvasConfig from '../model/CanvasConfig'
import Grid from '../../game/Grid'
import useCanvas from './useCanvas'

import { useLayoutEffect, useRef } from 'react'
import { Coordinate } from '../../Types'

const BACKGROUND_COLOR = '#eaeaea'
const HOVER_COLOR = '#a8a8a8'

export default function useCanvasGrid(grid: Grid, config: CanvasConfig) {
  const { lineWidth, lineSeparation, canvasLength, cellCount } = config
  const { canvasRef, withContext } = useCanvas(lineWidth)
  const hoveredCellPosition = useRef<Coordinate>(null)
  const toCanvasPosition = (cellPosition: number) => cellPosition * lineSeparation
  const toCellPosition = (cellPosition: number) => cellPosition / lineSeparation

  useLayoutEffect(drawGrid, [ grid, config.color ])

  function drawGrid() {
    withContext(context => {
      context.clear(canvasLength)
      context.withPath(() => {
        context.fillSquare(0, 0, canvasLength, BACKGROUND_COLOR)
        forEachCell((x, positionX) => {
          drawXY(positionX)
          forEachCell((y, positionY) => {
            const cell = grid.get(x, y)
            if (cell.alive) {
              drawCell(positionX, positionY)
            }
          })
        })
        ifCurrentHoveredCell((x, y) => highlightCell(x, y))
        context.withLineWidth(2, () => {
          context.draw(canvasLength, 0, canvasLength, canvasLength)
          context.draw(0, canvasLength, canvasLength, canvasLength)
        })
      })
    })
  }

  function drawXY(position: number) {
    withContext(({ draw }) => {
      draw(position, 0, position, canvasLength)
      draw(0, position, canvasLength, position)
    })
  }

  function drawCell(
    positionX: number, positionY: number,
    color = config.color,
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
    if (color === HOVER_COLOR) {
      unhighlightActiveCell()
    }
    grid.ifDeadCell(cellX, cellY, () => {
      drawCell(posX, posY, color, true)
      hoveredCellPosition.current = [ posX, posY ]
    })
  }

  function unhighlightActiveCell() {
    ifCurrentHoveredCell((x, y) => highlightCell(x, y, BACKGROUND_COLOR))
    hoveredCellPosition.current = null
  }

  function ifCurrentHoveredCell(
    operation: (cellX: number, cellY: number, posX: number, posY: number) => void
  ) {
    const { current } = hoveredCellPosition
    if (current) {
      const [ x, y ]  = current
      operation(toCellPosition(x), toCellPosition(y), x, y)
    }
  }

  return { canvasRef, highlightCell, unhighlightActiveCell }
}
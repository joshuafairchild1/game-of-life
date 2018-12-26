import * as React from 'react'
import Card from '@material-ui/core/Card/Card'
import CanvasConfig from './model/CanvasConfig'
import Grid from '../game/Grid'
import useCanvasGrid  from './hook/useCanvasGrid'

import './CanvasGrid.scss'

type Props = {
  configuration: CanvasConfig
  grid: Grid
  onCellClick: (x: number, y: number) => void
}

const CanvasGrid: React.FC<Props> = ({ grid, configuration, onCellClick }) => {
  const {
    canvasRef,
    highlightCell,
    unhighlightActiveCell
  } = useCanvasGrid(grid, configuration)
  const { current } = canvasRef

  function handleCellInteraction(
    handler: (cellX: number, cellY: number) => void
  ) {
    return function handleEvent(event: React.MouseEvent<HTMLCanvasElement>) {
      if (current) {
        const [ x, y ] = determineEnclosingCell(
          event, current, configuration.lineSeparation)
        handler(x, y)
      }
    }
  }
  return <Card className="canvas-wrapper" style={{
      width: configuration.canvasLength,
      height: configuration.canvasLength
    }}>
    <canvas
      ref={canvasRef}
      width={configuration.canvasLength}
      height={configuration.canvasLength}
      onMouseOut={handleCellInteraction(unhighlightActiveCell)}
      onMouseMove={handleCellInteraction(highlightCell)}
      onClick={handleCellInteraction(onCellClick)}/>
  </Card>
}
export default CanvasGrid

const determineEnclosingCell = (
  event: React.MouseEvent<HTMLCanvasElement>,
  canvas: HTMLCanvasElement, lineSeparation: number
) => {
  const x = Math.floor((event.pageX - canvas.offsetLeft) / lineSeparation)
  const y = Math.floor((event.pageY - canvas.offsetTop) / lineSeparation)
  return [ x, y ]
}

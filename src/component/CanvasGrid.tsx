import * as React from 'react'
import CanvasConfig from '../model/CanvasConfig'
import Grid from '../model/Grid'
import useCanvasGrid from './hook/useCanvasGrid'

type Props = {
  configuration: CanvasConfig
  grid: Grid
  onCellClick: (x: number, y: number) => void
}
const CanvasGrid: React.FC<Props> = ({ grid, configuration, onCellClick }) => {
  const { canvasRef, highlightCell } = useCanvasGrid(grid, configuration)
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

  return <canvas
    ref={canvasRef} id="canvas"
    width={configuration.canvasLength}
    height={configuration.canvasLength}
    onMouseMove={handleCellInteraction(highlightCell)}
    onClick={handleCellInteraction(onCellClick)}/>
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

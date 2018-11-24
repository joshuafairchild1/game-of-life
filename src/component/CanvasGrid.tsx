import * as React from 'react'
import CanvasConfig from '../model/CanvasConfig'
import Grid from '../model/Grid'
import useCanvasGrid from './hook/useCanvasGrid'

type Props = {
  config: CanvasConfig
  grid: Grid
  onCellClick: (x: number, y: number) => void
}

const CanvasGrid: React.FC<Props> = ({ grid, config, onCellClick }) => {
  const ref = useCanvasGrid(grid, config)
  const { current } = ref
  return <canvas
    ref={ref} id="canvas"
    width={config.canvasLength}
    height={config.canvasLength}
    onClick={event => {
      if (current) {
        const [ x, y ] = determineClickedCell(event, current, config.lineSeparation)
        onCellClick(x, y)
      }}
    }/>
}

export default CanvasGrid

const determineClickedCell = (
  event: React.MouseEvent<HTMLCanvasElement>,
  canvas: HTMLCanvasElement, lineSeparation: number
) => {
  const x = Math.floor((event.pageX - canvas.offsetLeft) / lineSeparation)
  const y = Math.floor((event.pageY - canvas.offsetTop) / lineSeparation)
  return [ x, y ]
}

import Grid from './Grid'
import { alive, dead } from './model/Cell'

export default function applyRules(current: Grid) {
  const pending = Grid.createWithLength(current.length, current.id + 1)
  current.forEach(cell => {
    const livingNeighbors = current.countLivingNeighbors(cell)
    const update = cell.alive
      ? (livingNeighbors < 2 || livingNeighbors > 3)
        ? dead(cell)
        : cell
      : livingNeighbors === 3 && alive(cell)
    if (update) {
      pending.set(update)
    }
  })
  return pending
}
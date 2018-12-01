
export function timed<T>(label: string, operation: () => T) {
  const start = Date.now()
  const result = operation()
  console.debug('took', Date.now() - start, 'ms to', label)
  return result
}

export function isNumber(value: number) {
  return !Number.isNaN(value)
}
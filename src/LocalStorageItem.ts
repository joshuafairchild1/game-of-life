export default class LocalStorageItem<T> {
  constructor(
    private key: string,
    private parseStrategy?: (stored: unknown) => T
  ) {
    if (typeof localStorage === 'undefined') {
      throw Error('LocalStorage not supported')
    }
  }

  get(): T | null {
    try {
      const stored = JSON.parse(localStorage.getItem(this.key)) || null
      if (stored === null) {
        return stored
      }
      if (this.parseStrategy) {
        return this.parseStrategy(stored) || null
      }
      return stored || null
    } catch (ex) {
      console.warn(
        `could not parse stored item "${this.key}" from localStorage`, ex)
      return null
    }
  }

  set(item: T) {
    localStorage.setItem(this.key, JSON.stringify(item))
  }
}
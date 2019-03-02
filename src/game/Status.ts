enum Status { Dead, Alive }

namespace Status {
  export function inverted(status: Status) {
    return status === Status.Alive ? Status.Dead : Status.Alive
  }

  export function from(value: unknown) {
    return (!value || value === 'false' || value === '0')
      ? Status.Dead : Status.Alive
  }
}

export default Status
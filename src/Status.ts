enum Status { Dead, Alive }

namespace Status {
  export function inverted(status: Status) {
    return status === Status.Alive ? Status.Dead : Status.Alive
  }

  export function from(value: any) {
    return (value === 'false' || value === '0')
      ? Status.Dead
      : !!value ? Status.Alive : Status.Dead
  }
}

export default Status
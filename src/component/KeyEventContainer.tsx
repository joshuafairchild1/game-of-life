import * as React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import useKeyEffect from './hook/useKeyEffect'

type Props = {
  keyName: string
  onKeyDown: (event: React.KeyboardEvent) => void
  children: React.ReactNode
}

const KeyEventContainer: React.FC<Props> = props => {
  const container = useRef<HTMLDivElement>(null)
  useEffect(() => container && container.current.focus(), [])
  return <div tabIndex={0}
              ref={container}
              style={{ outline: 'none' }}
              onKeyDown={useKeyEffect(' ', props.onKeyDown)}>
    {props.children}
  </div>
}

export default KeyEventContainer
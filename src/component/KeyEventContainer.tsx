import * as React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import keyEventHandler from '../utils'

type Props = {
  keyName: string
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void
  children: React.ReactNode
  className?: string
}

const KeyEventContainer: React.FC<Props> = props => {
  const container = useRef<HTMLDivElement>(null)
  useEffect(() => container && container.current.focus(), [])
  return <div tabIndex={0}
              ref={container}
              className={props.className || ''}
              style={{ outline: 'none' }}
              onKeyDown={keyEventHandler(props.keyName, props.onKeyDown)}>
    {props.children}
  </div>
}

export default KeyEventContainer
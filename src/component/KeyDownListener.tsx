import * as React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import keyEventHandler from '../utils'
import { KeyEventHandler } from '../Types'

type Props = {
  handlers: KeyEventHandler<HTMLDivElement>[]
  children: React.ReactNode
  className?: string
}

const KeyDownListener: React.FC<Props> = props => {
  const container = useRef<HTMLDivElement>(null)
  useEffect(() => container && container.current.focus(), [])
  return <div tabIndex={0}
              ref={container}
              className={props.className || ''}
              style={{ outline: 'none' }}
              onKeyDown={event => {
                for (const handler of props.handlers) {
                  keyEventHandler(handler.keyName, handler.onKeyDown)(event)
                }
              }}>
    {props.children}
  </div>
}

export default KeyDownListener
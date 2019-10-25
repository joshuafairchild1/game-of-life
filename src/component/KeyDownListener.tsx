import * as React from 'react'
import { MutableRefObject, useRef } from 'react'
import { KeyEventHandler, stopEvent } from '../utils'

type Props = {
  children: React.ReactNode
  handlers: KeyEventHandler[]
  refAccess?: MutableRefObject<HTMLDivElement>
  className?: string
}

const KeyDownListener: React.FC<Props> = props =>
  <div
    tabIndex={0}
    ref={props.refAccess || useRef<HTMLDivElement>(null)}
    className={props.className || ''}
    style={{ outline: 'none' }}
    onKeyDown={event => {
      stopEvent(event)
      for (const handler of props.handlers) {
        handler.handle(event)
      }
    }}
  >
    {props.children}
  </div>

export default KeyDownListener
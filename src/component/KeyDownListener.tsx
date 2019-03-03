import * as React from 'react'
import keyEventHandler from '../utils'
import { MutableRefObject, useRef } from 'react'
import { KeyEventHandler } from '../Types'

type Props = {
  handlers: KeyEventHandler<HTMLDivElement>[]
  children: React.ReactNode
  refAccess?: MutableRefObject<HTMLDivElement>
  className?: string
}

const KeyDownListener: React.FC<Props> = props => {
  const container = props.refAccess || useRef<HTMLDivElement>(null)
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
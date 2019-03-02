import * as React from 'react'
import useStateVariable from './state/useStateVariable'
import { useState } from 'react'
import { SketchPicker } from 'react-color'

import './ColorPicker.scss'

export default function ColorPicker() {
  const [ showPicker, setShowPicker ] = useState(false)
  const color = useStateVariable('color')
  return <>
    <div className="control-color-swatch"
         title="Choose Color"
         onClick={() => setShowPicker(true)}>
      <div style={{ background: color.get() }}/>
    </div>
    {showPicker &&
    <div className="control-color-popover">
      <div className="popover-cover"
           onClick={() => setShowPicker(false)}/>
      <SketchPicker
        color={color.get()}
        onChange={({ hex }) => color.set(hex)}/>
    </div>}
  </>
}
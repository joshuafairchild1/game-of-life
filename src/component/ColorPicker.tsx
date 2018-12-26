import * as React from 'react'
import { useState } from 'react'
import { SketchPicker } from 'react-color'
import { DynamicConfiguration } from '../Types'

import './ColorPicker.scss'

type Props = {
  color: DynamicConfiguration<string>
}

const ColorPicker: React.FC<Props> = props => {
  const [ showPicker, setShowPicker ] = useState(false)
  return <>
    <div className="control-color-swatch"
         title="Choose Color"
         onClick={() => setShowPicker(true)}>
      <div style={{ background: props.color.get() }}/>
    </div>
    {showPicker &&
    <div className="control-color-popover">
      <div className="popover-cover"
           onClick={() => setShowPicker(false)}/>
      <SketchPicker
        color={props.color.get()}
        onChange={({ hex }) => props.color.set(hex)}/>
    </div>}
  </>
}

export default ColorPicker
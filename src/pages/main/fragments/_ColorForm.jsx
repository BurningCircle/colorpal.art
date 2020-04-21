import React from 'react'
import { BaseInput } from "@components"
import "./_color_form.sass"


export const ColorForm = ({ inputValue, onInputChangeHandler, step, onRangeChangeHandler }) => (
  <div className="color-form">
    <div className="color-form__row">
      <div className="color-form__title">Pick a color:</div>
      <BaseInput placeholder="#ff00ff" value={inputValue} onChange={onInputChangeHandler} />
    </div>
    <input className="color-form__range" type="range" min={1} max={10} value={step} onChange={onRangeChangeHandler} />
  </div>
)